using System.ComponentModel.DataAnnotations;

namespace CrudAppModalPopUp.Models.DBEntities
{
    public class Product
    {
        [Key]
        [Required(ErrorMessage ="User Name is required")]
        public int Id { get; set; }

        [Required(ErrorMessage ="Name is required")]
        
        public string Name { get; set; }

        [Required(ErrorMessage ="Price is required")]
        public double Price { get; set; }

        [Required(ErrorMessage ="Quantity is required")]
        public int Qty { get; set; }

        

    }
}
