using CrudAppModalPopUp.DAL;
using CrudAppModalPopUp.Models;
using CrudAppModalPopUp.Models.DBEntities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Elfie.Diagnostics;
using Microsoft.CodeAnalysis.Elfie.Serialization;
using Microsoft.Win32;

namespace CrudAppModalPopUp.Controllers 
{
    public class ProductController : Controller
    {

        private readonly MyAppDbContext _context;

        public ProductController (MyAppDbContext context)//creating instance for accessing database.Can use context for accessing db
        {
            this._context = context; 
            
            
           
            
            
            

        }


        [HttpGet]
        public IActionResult Search(string searchTerm)
        {
            if (!string.IsNullOrEmpty(searchTerm))
            {
                var data= _context.Products.Where(model => model.Name.StartsWith(searchTerm)).ToList(); //the searchterm enter data starts character is there in db ie.employee
                return View(data);                                                                          //then convert it into tolist().

            }
            else
            {
                var data = _context.Products.ToList();
                return View(data);
            }
         
        }

        //[HttpGet]
        //public IActionResult Search(string searchTerm)
        //{
        //    var searchResults = SearchInDatabase(searchTerm);
        //    return View(searchResults);

        //}
        //private List<Product> SearchInDatabase(string searchTerm) {  // method acutally searching for db.

        //    var allproducts = _context.Products;
        //    List<Product> searchResults = new List<Product>();  //searchResults is a new list that store elements of Product.
        //    foreach(var product in allproducts)
        //    {
        //        if(product.Name !=null && product.Name.Equals(searchTerm))
        //        {
        //            searchResults.Add(product);
        //        }
                


        //    }
        //    return searchResults;

        //}
        



        //Action Methods
        public IActionResult Index() //Iactionresult represents result of an action method
        {
            return View();

            
        }

            
            
            
       

        public JsonResult GetProducts() //Json return json format data.
        {
            var products =_context.Products.ToList();
            return Json(products);
            
            
           
            

        }


        [HttpPost] 
        public JsonResult Insert([FromBody]Product product) 
        {
           

                if (ModelState.IsValid)
                {
                    _context.Products.Add(product);
                    _context.SaveChanges();
                    return Json("Product is saved");


                }
            
           
            
            
            
           
                return Json("Product not saved");
            
            
              
            
                 

        }
        [HttpGet]
        public JsonResult Edit(int id) //int id to specify which produxt you want to retrieve for editing.
        {
            var product = _context.Products.Find(id);
            return Json(product);
        }

        
        [HttpPost]
        public JsonResult Update(Product model)
        {
            if (ModelState.IsValid)
            {
                var existingProduct = _context.Products.Find(model.Id);

                if (existingProduct != null)
                {
                    // Update the existing product with the new values
                    existingProduct.Name = model.Name;
                    existingProduct.Price = model.Price;
                    existingProduct.Qty = model.Qty;

                    _context.SaveChanges();

                    return Json("Product details updated");
                }
                else
                {
                    return Json("Product not found");
                }
            }
            else
            {
                return Json("Product details failed");
            }
        }

        public JsonResult Delete(int id) {
            var product = _context.Products.Find(id);
            if(product != null) { 

                _context.Products.Remove(product); 
                _context.SaveChanges();
                return Json("Deleted");
            }

            return Json("not deleted");
        }

    }
}
