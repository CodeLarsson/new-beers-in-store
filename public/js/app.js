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

    const pagerEL = document.querySelector('#pager');
    pagerEL.innerHTML = `${apiPage}`;

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
        updatePager(apiPage, apiResponse.meta.nextPage, storeSelector.value);
        apiPage = apiResponse.meta.nextPage;
      }

      for (const product of apiResponse.products) {
        beerListEL.innerHTML += `
          <div class="beer">
            <div>${product.productNameBold}</div>
            <div>${product.producerName}</div>
            <div>${product.bottleText}</div>
            <div>${product.volumeText}</div>
            <div>${product.price} kr</div>
            <div>${product.productLaunchDate.split('T')[0]}</div>

          </div>
        `;
      }
    }
  };

  const updatePager = (currentPage, nextPage, storeId) => {
    const pagerEL = document.querySelector('#pager');
    const nextPageEL = document.createElement('button');
    nextPageEL.addEventListener('click', () => {
      getNewProductsForStore(nextPage);
    });
    pagerEL.appendChild(nextPageEL);
    nextPageEL.innerHTML = `${nextPage}`;
  };

  getStoreIds();
  storeSelector.addEventListener('change', () =>
    getNewProductsForStore(apiPage),
  );
})();
