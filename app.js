(function (){
  var products_root = document.querySelector('.products-gallery');
  var currentPageNumber = 1;

  // function makeProductsGallery();
  fetch('https://5f8dfe3e4c15c40016a1e4f7.mockapi.io/shop/products').then(res => res.json()).then(prods => {
    app.products = prods; 

    //before I watched the videos, I used this trick to fix my pages and products in each page 
    // for (var i = 0; i < 16; i++){
    //   products_root.appendChild(app.View.createProductsPage(
    //     app.products[i].title,
    //     app.products[i].img,
    //     app.Utils.toPersianNum(app.products[i].rankAverage),
    //     app.Utils.toPersianNum(app.products[i].rankCount),
    //     app.Utils.toPersianNum(app.products[i].price)
    //    ));
    // }

    app.Repository.numProductsPerPage(currentPageNumber).forEach((item) => {
      products_root.appendChild(
       app.View.createProductsPage(
        item.title,
        item.img,
        app.Utils.toPersianNum(item.rankAverage),
        app.Utils.toPersianNum(item.rankCount),
        app.Utils.toPersianNum(item.price)
       ) 
      );
    });
  
    app.View.createPagination(app.products.length, 16, currentPageNumber);
  });


  // //no fetch
  // app.products.forEach((item) => {
  //   products_root.appendChild(
  //    app.View.createProductsPage(
  //     item.title,
  //     item.img,
  //     app.Utils.toPersianNum(item.rankAverage),
  //     app.Utils.toPersianNum(item.rankCount),
  //     app.Utils.toPersianNum(item.price)
  //    ) 
  //   );
  // });

  // app.View.createPagination(app.products.length, 20, currentPageNumber);
  
  //My naming was different, so I had to copy this to change a few things around. 
  // {"id":1,"title":"گوشی موبایل سامسونگ مدل Galaxy S20 Ultra 5G SM-G988B/DS دو سیم کارت ظرفیت 128 گیگابایت",
  // "img":"https://dkstatics-public.digikala.com/digikala-products/121614556.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90",
  // "rankAverage":0.5,"rankCount":381,"price":257000,"views":787,"sold":296}

  document.querySelector('.page-num').addEventListener('click', function(e){
    e.preventDefault();

    // console.log(e.target.tagName);
    if(e.target.tagName === 'BUTTON'){
      products_root.innerHTML = '';
      currentPageNumber = +e.target.dataset.page;
      app.Repository.numProductsPerPage(currentPageNumber).forEach((item) => {
        products_root.appendChild(
         app.View.createProductsPage(
          item.title,
          item.img,
          app.Utils.toPersianNum(item.rankAverage),
          app.Utils.toPersianNum(item.rankCount),
          app.Utils.toPersianNum(item.price)
         ) 
        );
      });
      app.View.createPagination(app.products.length, 16, currentPageNumber);

    }
  });

})();




