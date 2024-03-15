(() => {
  let apiPage = 1;
  const storeSelector = document.querySelector('#storeSelector');
  const getStoreIds = async () => {
    const response = await fetch('/api/get-store-ids');
    const storeIds = await response.json();

    if (response.ok) {
      Object.entries(storeIds.storeIds).forEach(([key, value]) => {
        storeSelector.innerHTML += `<option value="${value}">${key}</option>`;
      });
    } else {
      console.error(response);
    }
  };

  const getNewProductsForStore = async (page) => {
    if (storeSelector.value === '') {
      return;
    }
    const beerListEL = document.querySelector('#beerListing');
    beerListEL.innerHTML = '';

    const response = await fetch('/api/get-new-products-for-store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storeId: storeSelector.value,
        page,
      }),
    });

    if (response.ok) {
      const apiResponse = await response.json();

      if (apiResponse.meta.nextPage !== apiPage) {
        updatePager(apiPage, apiResponse.meta.nextPage);
        apiPage =
          apiResponse.meta.nextPage === -1
            ? apiPage
            : apiResponse.meta.nextPage;
      }

      beerListEL.innerHTML =
        '<div class="beer"><div class="beer-info">Product</div><div class="beer-info">Producer</div><div class="beer-info">Bottle</div><div class="beer-info">Volume</div><div class="beer-info">Price</div><div class="beer-info">Date</div > ';
      for (const product of apiResponse.products) {
        beerListEL.innerHTML += `
          <div class="beer">
            <div class="beer-info">${product.productNameBold}</div>
            <div class="beer-info">${product.producerName}</div>
            <div class="beer-info">${product.bottleText}</div>
            <div class="beer-info">${product.volumeText}</div>
            <div class="beer-info">${product.price} kr</div>
            <div class="beer-info">${product.productLaunchDate.split('T')[0]}</div>

          </div>
        `;
      }
    }
  };

  const updatePager = (currentPage, nextPage) => {
    console.log(currentPage, nextPage);
    const pagerEL = document.querySelector('#pager');
    pagerEL.innerHTML = '';

    const prevPageEL = document.createElement('button');
    prevPageEL.textContent = nextPage === -1 ? currentPage - 1 : currentPage;
    prevPageEL.addEventListener('click', () => {
      getNewProductsForStore(nextPage === -1 ? currentPage - 1 : currentPage);
    });

    const nextPageEL = document.createElement('button');
    nextPageEL.textContent = nextPage === -1 ? currentPage : nextPage;
    nextPageEL.addEventListener('click', () => {
      getNewProductsForStore(nextPage === -1 ? currentPage : nextPage);
    });

    if (currentPage) {
      pagerEL.appendChild(prevPageEL);
    }
    if (nextPage) {
      pagerEL.appendChild(nextPageEL);
    }
  };

  getStoreIds();
  storeSelector.addEventListener('change', () => getNewProductsForStore(1));
})();
