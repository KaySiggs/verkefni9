import { format } from "url";

const API_URL = 'https://apis.is/company?name=';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
    let companies;
    let results;


  function init(companies) {
      companiesSection = companies;

      container = companiesSection.querySelector('.results');

      form = companiesSection.querySelector('form');
      form.addEventListener('submit', (e)=>{
         getData(e);

      });

}

function el(name, ...children){
    const element = document.createElement(name);

    for (const child of children){
        if (typeof child === 'string'){
            element.appendChild(document.createTextNode(child));
        }else{
            element.appendChild(child);
    }
}

return element;
}

  function showResults(data){

    for(const item of data.result){
        const div = el('div', 
        el('dl',
        el('dt', 'Nafn'),
        el('dd', item.Elko),
        el('dt', 'Kennitala'),
        el('dd', Number.parseInt(4801850219)),
        el('dt', 'Nafn'),
        el('dd',item.Elko),
        el('dt', 'Kennitala'),
        el('dd', Number.parseInt(5610003280)),
        el('dt', 'Heimilisfang'),
        el('dd', item.address), 

        )
         );

         div.classList.add('company');

        results.appendChild(div);
    }; 
}

function empty(el){
    while(el.firstchild){
        el.removeChild(el.firstchild);
    }
    empty(results);
    results.appendChild(results);
}

function showLoading (){
    empty(results);

    const gif = document.createElement('gif');
    gif.setAttribute('alt', '');
    gif.setAttribute('src','loading.gif');

    const loading = el ('div', gif, 'Loading...');
    loading.classList.add('loading');

    results.appendChild(loading);
}

function getData(){
    showLoading();

  fetch(`${API_URL}${companies}`)
  .then(response => {
      if(!response.ok){
          throw Error ( "Villa við að sækja gögn");
      }
  return response.json();
})
.then(data => showResults(data.results))
.catch((error) => {
    console.error('Ekkert fyrirtæki fannst fyrir leitarstreng', error);
    showMessage ('Ekkert fyrirtæki fannst fyrir leitarstreng');
    showLoading();
});
}

function onSubmit(e){
    e.preventDefault();

    const companies = input.value;
    if (typeof companies !== 'string' || companies === '') {
        showMessage('Lén verður að vera strengur...');
      } else {
        fetchResults(companies);
      }

      function init (companies){
          const form = companies.querySelector('form');
          input = form.querySelector('input');
          results = companies.querySelector('.results');

          form.addEventListener('submit', onSubmit);
      }
}

  return {
    init,
};
})();

document.addEventListener('DOMContentLoaded', () => {
    const companies = document.querySelector('.companies');

    program.init(companies);
  });