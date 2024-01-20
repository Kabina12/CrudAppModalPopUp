using CrudAppModalPopUp.Models.DBEntities;
using Microsoft.EntityFrameworkCore;

namespace CrudAppModalPopUp.DAL
{
    public class MyAppDbContext : DbContext 
    {
        public MyAppDbContext(DbContextOptions<MyAppDbContext> options) : base(options) {
        }
        public virtual DbSet<Product> Products { get; set; }    
    }
}
