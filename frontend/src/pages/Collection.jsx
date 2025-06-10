import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = ({ search }) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/get_all_products/");
        const data = await res.json();
        setProducts(data.products);
        setFilterProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    let filtered = [...products];

    // Apply search
    if (search.trim()) {
      const searchWords = search.toLowerCase().split(" ").filter(Boolean);
    
      filtered = filtered.filter((p) => {
        const haystack = `${p.name} ${p.category} ${p.sub_category}`.toLowerCase();
    
        return searchWords.every((word) => haystack.includes(word));
      });
    }

    // Apply category filters
    if (category.length) {
      filtered = filtered.filter((p) => category.includes(p.category));
    }

    // Apply subcategory filters
    if (subCategory.length) {
      filtered = filtered.filter((p) => subCategory.includes(p.sub_category));
    }

    // Apply sort
    if (sortType === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filtered);
  }, [search, category, subCategory, sortType, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Sidebar */}
      <div className="min-w-60">
        <p className="my-2 text-xl">FILTERS</p>

        <div className="border border-gray-300 pl-5 py-3 mt-6">
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((c) => (
              <label key={c} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={c}
                  onChange={toggleCategory}
                />
                {c}
              </label>
            ))}
          </div>
        </div>

        <div className="border border-gray-300 pl-5 py-3 my-5">
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((s) => (
              <label key={s} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={s}
                  onChange={toggleSubCategory}
                />
                {s}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item) => {
            const imageUrl =
              item.images && item.images.length > 0
                ? item.images[0].image
                : null; // null will trigger the fallback in ProductItem
            // console.log("Rendering product:", item.id, imageUrl);

            return (
              <ProductItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={imageUrl}
                currency="₹"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;

// const Collection = () => {

//   const { products, search, showSearch } = useContext(ShopContext);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState('relevant');

//   const toggleCategory = (e) => {

//     if (category.includes(e.target.value)) {
//       setCategory(prev => prev.filter(item => item !== e.target.value))
//     }
//     else{
//       setCategory(prev => [...prev,e.target.value])
//     }
//   }

//   const toggleSubCategory =(e) => {

//     if (subCategory.includes(e.target.value)) {
//       setSubCategory(prev => prev.filter(item => item !== e.target.value))
//     }
//     else{
//       setSubCategory(prev => [...prev,e.target.value])
//     }
//   }

//   const applyFilter = () => {

//     let productsCopy = products.slice();

//     if (showSearch && search) {
//       productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
//     }

//     if (category.length > 0) {
//       productsCopy = productsCopy.filter(item => category.includes(item.category));
//     }
//     if (subCategory.length > 0) {
//       productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
//     }

//     setFilterProducts(productsCopy)
//   }

//   const sortProduct = () => {

//     let fpCopy = filterProducts.slice();

//     switch (sortType) {
//       case 'low-high' :
//         setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price )));
//         break;

//       case 'high-low' :
//         setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)));
//         break;

//       default:
//         applyFilter();
//         break;
//     }

//   }

//   // useEffect(() => {
//   //   setFilterProducts(products);
//   // }, [])

//   useEffect(()=>{
//     applyFilter();
//   },[category,subCategory,search,showSearch])

//   useEffect(()=>{
//     sortProduct();
//   },[sortType])

//   return (
//     <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
//       {/* Filter Option */}
//       <div className="min-w-60">
//         <p
//           onClick={() => setShowFilter(!showFilter)}
//           className="my-2 text-xl flex items-center cursor-pointer gap-2"
//         >
//           FILTERS
//           <img
//             className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
//             src={assets.dropdown_icon}
//             alt=""
//           />
//         </p>
//         {/* Category Filter */}
//         <div
//           className={`border border-gray-300 pl-5 py-3 mt-6 ${
//             showFilter ? "" : "hidden"
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">CATEGORIES</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             <p className="flex gap-2">
//               <input className="w-3" type="checkbox" value={"Men"} onChange={toggleCategory} />
//               Men
//             </p>
//             <p className="flex gap-2">
//               <input className="w-3" type="checkbox" value={"Women"} onChange={toggleCategory} />
//               Women
//             </p>
//             <p className="flex gap-2">
//               <input className="w-3" type="checkbox" value={"Kids"} onChange={toggleCategory} />
//               Kids
//             </p>
//           </div>
//         </div>
//         {/* SubCategory filter */}
//         <div
//           className={`border border-gray-300 pl-5 py-3 my-5 ${
//             showFilter ? "" : "hidden"
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">TYPE</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             <p className="flex gap-2">
//               <input className="w-3" type="checkbox" value={"Topwear"} onChange={toggleSubCategory} />
//               Topwear
//             </p>
//             <p className="flex gap-2">
//               <input className="w-3" type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} />
//               Bottomwear
//             </p>
//             <p className="flex gap-2">
//               <input className="w-3" type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} />
//               Winterwear
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="flex-1">
//         <div className="flex justify-between text-base sm:text-2xl mb-4">
//           <Title text1={"ALL"} text2={"COLLECTIONS"} />
//           {/* Product sort */}
//           <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
//             <option value="relevant">Sort by: Relevant</option>
//             <option value="low-high">Sort by: Low to High</option>
//             <option value="high-low">Sort by: High to Low</option>
//           </select>
//         </div>

//         {/* Map Products */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
//            {
//             filterProducts.map((item,index)=>(
//               <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
//             ))
//            }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Collection;
