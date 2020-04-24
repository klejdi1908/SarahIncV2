using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SarahIncV2.DbModels
{
    public partial class SarahIncContext : DbContext
    {
        public SarahIncContext()
        {
        }

        public SarahIncContext(DbContextOptions<SarahIncContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Audit> Audit { get; set; }
        public virtual DbSet<Evaluation> Evaluation { get; set; }
        public virtual DbSet<EvaluationSubject> EvaluationSubject { get; set; }
        public virtual DbSet<Form> Form { get; set; }
        public virtual DbSet<FormArea> FormArea { get; set; }
        public virtual DbSet<FormUser> FormUser { get; set; }
        public virtual DbSet<FormVariable> FormVariable { get; set; }
        public virtual DbSet<PrintOption> PrintOption { get; set; }
        public virtual DbSet<PrintVariable> PrintVariable { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Setting> Setting { get; set; }
        public virtual DbSet<Subject> Subject { get; set; }
        public virtual DbSet<TemplateArea> TemplateArea { get; set; }
        public virtual DbSet<TemplateVariable> TemplateVariable { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=40.117.239.214,1433;Initial Catalog=SarahIncV2;Persist Security Info=True;User ID=cribbinDbAdmin;Password=7q2{}VqFZ~:-;MultipleActiveResultSets=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Audit>(entity =>
            {
                entity.Property(e => e.DateTime).HasColumnType("datetime");
            });

            modelBuilder.Entity<Evaluation>(entity =>
            {
                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(128);

                entity.HasOne(d => d.Form)
                    .WithMany(p => p.Evaluation)
                    .HasForeignKey(d => d.FormId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Evaluation_TempEvalForm");
            });

            modelBuilder.Entity<EvaluationSubject>(entity =>
            {
                entity.HasKey(e => new { e.EvalId, e.SubjId });

                entity.HasOne(d => d.Eval)
                    .WithMany(p => p.EvaluationSubject)
                    .HasForeignKey(d => d.EvalId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EvaluationSubject_Evaluation");

                entity.HasOne(d => d.Subj)
                    .WithMany(p => p.EvaluationSubject)
                    .HasForeignKey(d => d.SubjId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EvaluationSubject_Subject");
            });

            modelBuilder.Entity<Form>(entity =>
            {
                entity.HasKey(e => e.TempId);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Dob)
                    .HasColumnName("DOB")
                    .HasColumnType("date");

                entity.Property(e => e.EvalDate).HasColumnType("date");

                entity.Property(e => e.Firstname).HasMaxLength(128);

                entity.Property(e => e.LastSaved).HasColumnType("datetime");

                entity.Property(e => e.Lastname).HasMaxLength(128);

                entity.Property(e => e.MagicNo).HasMaxLength(128);

                entity.HasOne(d => d.LastUser)
                    .WithMany(p => p.Form)
                    .HasForeignKey(d => d.LastUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TempEvalForm_User");
            });

            modelBuilder.Entity<FormArea>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(128);

                entity.Property(e => e.Value).IsRequired();

                entity.HasOne(d => d.Form)
                    .WithMany(p => p.FormArea)
                    .HasForeignKey(d => d.FormId)
                    .HasConstraintName("FK_FormArea_TempEvalForm");
            });

            modelBuilder.Entity<FormUser>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.TempEvalFormId });

                entity.HasOne(d => d.TempEvalForm)
                    .WithMany(p => p.FormUser)
                    .HasForeignKey(d => d.TempEvalFormId)
                    .HasConstraintName("FK_EditorTempForm_TempEvalForm");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.FormUser)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EditorTempForm_User");
            });

            modelBuilder.Entity<FormVariable>(entity =>
            {
                entity.HasKey(e => e.FormDataId);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(128);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(128);

                entity.HasOne(d => d.Form)
                    .WithMany(p => p.FormVariable)
                    .HasForeignKey(d => d.FormId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_FormVariable_TempEvalForm");
            });

            modelBuilder.Entity<PrintOption>(entity =>
            {
                entity.Property(e => e.Name)
                    .HasMaxLength(128)
                    .IsUnicode(false);

                entity.HasOne(d => d.Form)
                    .WithMany(p => p.PrintOption)
                    .HasForeignKey(d => d.FormId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_PrintOption_TempEvalForm");
            });

            modelBuilder.Entity<PrintVariable>(entity =>
            {
                entity.HasKey(e => e.PrintVarId);

                entity.Property(e => e.PageBreaks)
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.HasOne(d => d.Form)
                    .WithMany(p => p.PrintVariable)
                    .HasForeignKey(d => d.FormId)
                    .HasConstraintName("FK_PrintVariable_Form");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Rolename)
                    .IsRequired()
                    .HasMaxLength(128);
            });

            modelBuilder.Entity<Setting>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(128);

                entity.Property(e => e.ValueString).HasMaxLength(128);
            });

            modelBuilder.Entity<Subject>(entity =>
            {
                entity.Property(e => e.Address).HasMaxLength(256);

                entity.Property(e => e.Alias).HasMaxLength(128);

                entity.Property(e => e.Email).HasMaxLength(128);

                entity.Property(e => e.FileNo).HasMaxLength(128);

                entity.Property(e => e.Firstname).HasMaxLength(128);

                entity.Property(e => e.Lastname).HasMaxLength(128);

                entity.Property(e => e.Phone).HasMaxLength(128);
            });

            modelBuilder.Entity<TemplateArea>(entity =>
            {
                entity.Property(e => e.Class)
                    .IsRequired()
                    .HasMaxLength(128);
            });

            modelBuilder.Entity<TemplateVariable>(entity =>
            {
                entity.HasKey(e => e.TmplId);

                entity.HasIndex(e => e.Name)
                    .HasName("IX_TemplateVariable")
                    .IsUnique();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(128);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(128);

                entity.Property(e => e.Section).HasMaxLength(128);

                entity.Property(e => e.SubSection).HasMaxLength(128);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TemplateVariable)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_TemplateVariable_User");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Username)
                    .HasName("IX_User")
                    .IsUnique();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Firstname)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Lastname)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(130);

                entity.Property(e => e.Title).HasMaxLength(128);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(128);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Role");
            });
        }
    }
}
