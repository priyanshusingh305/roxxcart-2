const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData) {
//  console.log(reqData);
  let topLavel = await Category.findOne({ name: reqData.topLavelCategory });

  if (!topLavel) {
    topLavel = new Category({
      name: reqData.topLavelCategory,
      level: 1,
    });
    await topLavel.save()
  }

  let secondLavel = await Category.findOne({
    name: reqData.secondLavelCategory,
    parentCategory: topLavel._id,
  }
  );

  if(!secondLavel){
    secondLavel=new Category({
        name: reqData.secondLavelCategory,
        parentCategory:topLavel._id,
        level:2
    })
    await secondLavel.save()
  }

  let thirdLavel=await Category.findOne({
    name:reqData.thirdLavelCategory,
    parentCategory:secondLavel._id,
  })
if(!thirdLavel){
    thirdLavel=new Category({
        name: reqData.thirdLavelCategory,
        parentCategory:secondLavel._id,
        level:3, 
    })
    await thirdLavel.save()
}

const product = new Product({
    title:reqData.title,
    color:reqData.color,
    description:reqData.description,
    discountedPrice:reqData.discountedPrice,
    discountPersent:reqData.discountPersent,
    imageUrl:reqData.imageUrl,
    brand:reqData.brand,
    price:reqData.price,
    sizes:reqData.size,
    quantity:reqData.quantity,
    category:thirdLavel._id,
}) 
return await product.save();
}

async function deleteProduct(productId){
    const product=await findProductById(productId);

    await Product.findByIdAndDelete(productId);
    return "Product deleted Successfully";
}

async function updateProduct(productId,reqData){
    return await  Product.findByIdAndDelete(productId,reqData);
}

async function findByProductId(id){
    const product =await Product.findById(id).populate("category").exec()


    if(!product){
        throw new Error("Product not found with id "+ id);
    }
    return product;
}

async function getAllProducts(reqData){
  
    let {category,color,sizes,minPrice,maxPrice,minDiscount,stock,sort,pageNumber,pageSize}=reqData;
    
    pageSize=pageSize || 10;
    
    let query=Product.find().populate("category");
    // console.log("\nreqdata :",reqData)


  if (category) {
    // console.log("category:",(category));
    const existCategory = await Category.findOne({ name: category });
  
    if (existCategory) {
      // Use the _id property only if existCategory is not null or undefined
      const categoryId = existCategory._id;
      query = query.where("category").equals(categoryId);
    } else {
      // Return an empty result if the category does not exist
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }
  
 //white, black, orange 
  if(color){
    const colorSet=new Set(color.split(",").map(color=>color.trim().toLowerCase()));
    
    const colorRegex=colorSet.size>0?new RegExp([...colorSet].join("|"),"i"):null;

    query=query.where("color").regex(colorRegex);
  }
  if(sizes){
    // console.log(sizes)
    const sizesSet=new Set(sizes);
    query.query.where("sizes.name").in([...sizesSet])
}


if(minPrice && maxPrice){
    query=query.where('discountedPrice').gte(minPrice).lte(maxPrice);
}
if(minDiscount){
    query=query.where("discountPersent").gte(minDiscount);
}

if(stock){
    if(stock==="in_stock"){
        query= query.where("quantity").gt(0)
    }
    else if(stock==="out_of_stock"){
      query= query.where("quantity").lt(1)
    }
}

if(sort){
    const sortDirection=sort==="price_high"?-1:1;
    query=query.sort({discountedPrice:sortDirection})
}

    const totalProducts=await Product.countDocuments(query);

    const skip=(pageNumber)*pageSize;

    query=query.skip(skip).limit(pageSize);

    const products=await query.exec();

    const totalPages=Math.ceil(totalProducts/pageSize);

    return {content:products,currentPage:pageNumber,totalPages }

}

async function createMultipleProduct(products){
    for(let product of products){
        // console.log(product)
        await createProduct(product)
    }
}

module.exports={
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findByProductId,
    createMultipleProduct,
}




