(() => {
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

  const getNewProductsForStore = async () => {
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
        page: 1,
      }),
    });

    if (response.ok) {
      const products = await response.json();
      for (const product of products) {
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

  getStoreIds();
  storeSelector.addEventListener('change', getNewProductsForStore);
})();
