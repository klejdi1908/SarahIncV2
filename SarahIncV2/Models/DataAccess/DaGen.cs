using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using SarahIncV2.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Z.EntityFramework.Plus;

namespace SarahIncV2.Models
{
    public class DaGen<T> : DaBaseModel<T> where T : class
    {
        private readonly IMapper _mapper;

        public DaGen(IMapper mapper)
        {
            _mapper = mapper;
        }

        #region Helpers

        public struct PrimaryKey
        {
            public string Name { get; set; }
            public int Value { get; set; }
        }

        public static Tuple<int, int?> GetPrimaryKeys<TU>(TU entity)
        {
            using (var db = new SarahIncContext())
            {
                var keyNames = db.Model.FindEntityType(typeof(TU)).FindPrimaryKey().Properties.Select(x => x.Name).ToList();
                var keyNameCount = keyNames.Count;

                return (new Tuple<int, int?>((int)entity.GetType().GetProperty(keyNames[0]).GetValue(entity, null),
                    keyNameCount > 1 ? (int?)entity.GetType().GetProperty(keyNames[1]).GetValue(entity, null) : null)); ;
            }
        }

        public static string GetObjectProperties<TU>(TU model)
        {
            var type = model.GetType();
            var properties = type.GetProperties();
            return properties.Aggregate(string.Empty, (current, prop) => current + ("Name: " + prop.Name + ", Value: " + prop.GetValue(model, null) + ";"));
        }

        #endregion

        #region Creates/Upserts

        public async Task<List<Tuple<int, int?>>> UpsertRecords<TU, TV>(List<TU> recordModels, List<int> pks, List<int> pkSeconds = null) where TV : class, new()  // TU is the model, TV is the dbSet type
        {
            var resultList = new List<Tuple<int, int?>>();
            var currentRecordIdx = 0;

            try
            {
                using (var db = new SarahIncContext())
                {
                    var modelCount = recordModels.Count;
                    var pkCount = pks.Count;
                    var totalRecords = new List<TV>();
                    var noRecords = false;

                    if (modelCount != pkCount) return resultList;

                    for (var x = 0; x < modelCount; ++x)
                    {
                        currentRecordIdx = x;
                        var currentRecord = new TV();

                        if (pks[x] != 0)
                        {
                            if (pkSeconds == null)
                            {
                                currentRecord = await db.Set<TV>().FindAsync(pks[x]);
                            }
                            else
                            {
                                currentRecord = await db.Set<TV>().FindAsync(pks[x], pkSeconds[x]);
                            }

                            if (currentRecord == null)
                            {
                                currentRecord = new TV();
                                noRecords = true;
                            }
                        }

                        if (pks[x] == 0 || (pkSeconds != null && pkSeconds[x] == 0) || noRecords)
                        {
                            db.Set<TV>().Add(currentRecord);
                        }

                        _mapper.Map(recordModels[x], currentRecord);
                        totalRecords.Add(currentRecord);
                    }

                    await db.SaveChangesAsync();

                    for (var x = 0; x < modelCount; ++x)
                    {
                        resultList.Add(GetPrimaryKeys(totalRecords[x]));
                    }

                    return resultList;
                }
            }
            catch (Exception ex)
            {
                Logging.LogError(ex.Message, MethodBase.GetCurrentMethod().ToString(), typeof(TU) + " " + GetObjectProperties(recordModels[currentRecordIdx]));
            }

            return resultList;
        }

        #endregion

        #region Deletes

        public async Task<bool> DeleteRecord<TU>(int id, int secondId = 0) where TU : class
        {
            try
            {
                using (var db = new SarahIncContext())
                {
                    TU record;

                    if (secondId == 0)
                    {
                        record = await db.Set<TU>().FindAsync(id);
                    }
                    else
                    {
                        record = await db.Set<TU>().FindAsync(id, secondId);
                    }

                    db.Set<TU>().Remove(record);
                    await db.SaveChangesAsync();

                    return true;
                }
            }
            catch (Exception ex)
            {
                Logging.LogError(ex.Message, MethodBase.GetCurrentMethod().ToString(), typeof(TU) + " " + id);
            }

            return false;
        }

        public async Task<bool> DeleteRecords<TU>(List<Tuple<int, int?>> records) where TU : class
        {
            try
            {
                using (var db = new SarahIncContext())
                {
                    var idCount = records.Count;

                    for (var x = 0; x < idCount; ++x)
                    {
                        TU record;

                        if (records[x].Item2 == null)
                        {
                            record = await db.Set<TU>().FindAsync(records[x].Item1);
                        }
                        else
                        {
                            record = await db.Set<TU>().FindAsync(records[x].Item1, records[x].Item2);
                        }

                        if (record != null) db.Set<TU>().Remove(record);
                    }

                    await db.SaveChangesAsync();

                    return true;
                }
            }
            catch (Exception ex)
            {
                Logging.LogError(ex.Message, MethodBase.GetCurrentMethod().ToString(), typeof(TU) + " " + string.Join(",", records));
            }

            return false;
        }

        public async Task<List<TU>> ReadAllRecords<TU, TV>() where TV : class
        {
            try
            {
                using (var db = new SarahIncContext())
                {
                    BaseQuery = (IQueryable<T>)db.Set<TV>().ProjectTo<TU>(_mapper.ConfigurationProvider);
                    SetPredicateExp();
                    Count = BaseQuery.DeferredCount().FutureValue();
                    SetSortOrder(typeof(TV).GetProperties().Select(f => f.Name).First());
                    SetPaging();

                    return await (BaseQuery as IQueryable<TU>).Future().ToListAsync();
                }
            }
            catch (Exception ex)
            {
                Logging.LogError(ex.Message, System.Reflection.MethodBase.GetCurrentMethod().ToString(), "");
            }

            return new List<TU>();
        }

        public async Task<TU> ReadRecordById<TU, TV>(int id, int secondId = 0) where TV : class where TU : new()
        {
            var record = new TU();

            try
            {
                using (var db = new SarahIncContext())
                {
                    TV result;

                    if (secondId == 0)
                    {
                        result = await db.Set<TV>().FindAsync(id);
                    }
                    else
                    {
                        result = await db.Set<TV>().FindAsync(id, secondId);
                    }

                    _mapper.Map(result, record);
                }
            }
            catch (Exception ex)
            {
                Logging.LogError(ex.Message, MethodBase.GetCurrentMethod().ToString(), typeof(TU) + " " + id);
            }

            return record;
        }

        public async Task<List<TU>> ReadRecords<TU, TV>() where TV : class
        {
            try
            {
                using (var db = new SarahIncContext())
                {
                    BaseQuery = (IQueryable<T>)db.Set<TV>(); // DEV .ProjectTo<TU>();
                    SetPredicateExp();
                    Count = BaseQuery.DeferredCount().FutureValue();
                    SetSortOrder(typeof(TV).GetProperties().Select(f => f.Name).First());
                    SetPaging();

                    return await (BaseQuery as IQueryable<TU>).Future().ToListAsync();
                }
            }
            catch (Exception ex)
            {
                Logging.LogError(ex.Message, MethodBase.GetCurrentMethod().ToString(), "");
            }

            return new List<TU>();
        }

        public async Task<List<TU>> ReadLinkedRecordsById<TU, TV>() where TV : class where TU : new()
        {
            var result = new List<TU>();

            try
            {
                using (var db = new SarahIncContext())
                {
                    BaseQuery = (IQueryable<T>) db.Set<TV>().ProjectTo<TU>(_mapper.ConfigurationProvider);
                    SetPredicateExp();
                    result = await (BaseQuery as IQueryable<TU>).Future().ToListAsync();
                }
            }
            catch (Exception ex)
            {
                Logging.LogError(ex.Message, MethodBase.GetCurrentMethod().ToString(), typeof(TU) + " " + PredicateExp);
            }

            return result;
        }

        #endregion
    }
}
