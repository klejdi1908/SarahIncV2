using System;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace SarahIncV2.Models
{
    public class DaBaseModel<T>
    {
        public IQueryable<T> BaseQuery { get; set; }
        public string SortOrder { get; set; }
        public int? Take { get; set; }
        public int? Skip { get; set; }
        public int Count { get; set; }
        public System.Linq.Expressions.Expression<Func<T, bool>> PredicateExp { get; set; }

        public void SetPaging()
        {
            if (Skip != null && Skip > 0) BaseQuery = BaseQuery.Skip(Convert.ToInt32(Skip));
            if (Take != null && Take > 0) BaseQuery = BaseQuery.Take(Convert.ToInt32(Take));
        }

        public void SetSortOrder(string idCol)
        {
            BaseQuery = BaseQuery.OrderBy(!string.IsNullOrEmpty(SortOrder) ? SortOrder : idCol);
        }

        public void SetPredicateExp()
        {
            if (PredicateExp != null) BaseQuery = BaseQuery.Where(PredicateExp);
        }
    }
}
