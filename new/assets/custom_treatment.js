const userLocationIP=()=>{fetch("https://us-central1-functions-358315.cloudfunctions.net/location",{method:"GET",redirect:"follow"}).then(response=>response.json()).then(result=>deliveryDate(result)).catch(error=>console.log("error",error))};function getDeliveryRange(stateAcronym){console.log(stateAcronym);const stateFound=window.statesInfo.find(state=>state.stateAcronym===stateAcronym);return stateFound?stateFound.deliveryRange:null}const deliveryDate=location=>{const{countryCode,region}=location,messageContainer=document.querySelector(".orderby-receiveby__shipping-text"),nationalMessage=window.nationalText.split("[]");if(countryCode!="US")messageContainer.innerText=window.internationalText;else{const foundNationalDate=getDeliveryRange(region.toUpperCase());messageContainer.innerText=`${nationalMessage[0]} ${foundNationalDate} ${nationalMessage[1]}`}document.querySelector(".orderby-receiveby").classList.remove("hidden")},swiperBeforeAfter=(selector,paginationClass)=>new Swiper(`${selector}`,{slidesPerView:1,pagination:{el:`${paginationClass}`,clickable:!0}});swiperBeforeAfter(".swiper-products",".swiper-pagination-products"),swiperBeforeAfter(".swiper-page-product",".swiper-pagination-product-page");const swiperResult=new Swiper(".swiper-info-result",{slidesPerView:1,centeredSlides:!0,pagination:{el:".swiper-pagination-real-result",clickable:!0}}),verifyCustomer=()=>{document.cookie.split("; ").find(row=>row.startsWith("newCustomer="))?.split("=")[1]?document.querySelectorAll(".cross-sell").forEach(element=>{element.classList.remove("hidden")}):document.cookie="newCustomer=true; max-age=2592000; path=/"},atcNoPricesPdp=()=>{const subscriptionTypes=document.querySelectorAll(".subscriptionType");console.log(subscriptionTypes),subscriptionTypes&&subscriptionTypes.forEach(element=>{element.addEventListener("click",function(e){const subscriptionType=e.currentTarget.getAttribute("data-subscription");document.querySelectorAll(".subscriptions-prices").forEach(element2=>{element2.classList.add("hidden")}),document.getElementById(`${subscriptionType}`).classList.remove("hidden")})})};document.addEventListener("DOMContentLoaded",function(){atcNoPricesPdp();const pageTargeting=["/products/q-rejuvalight-pro-facewear","/pages/microinfusion","/products/neck-decolletage-led","/products/micro-infusion-targeted-patches","/products/face-serum","/pages/micro-infusion-refill","/products/q-rify-replacement-water-filter","/products/q-urify-water-filter"],currentPath=window.location.pathname;pageTargeting.includes(currentPath)&&verifyCustomer();const socialProofContainer=document.querySelector(".social-proof-data-container"),quantityElement=document.querySelector(".social-proof-data-container #quantity"),closeIcon=document.querySelector(".social-proof-data-container .close-icon"),containerAtcButton=document.querySelector(".nav_e-commerce .cart-custom"),containerAtcButtonProdFaceSerum=document.querySelectorAll(".button_sticky_wrapper");if(socialProofContainer){let fetchData2=function(url2,id){let requestOptions={method:"GET",redirect:"follow"};return fetch(url2+id,requestOptions).then(response=>response.json()).catch(error=>console.log("error",error))};var fetchData=fetchData2;let{productId,productHandle,productList}=socialProofContainer.dataset,url="https://webhooks.endrock.software/endrockapi/v3/app/analytics/reportsGA4.php?filterBy=productId&store=qure&name=Qure: GA4&productId=";const renderQuantity=quantity=>{setTimeout(()=>{const chatIcon=document.querySelector("iframe#launcher");chatIcon&&chatIcon.classList.add("new-bottom")},1e3),quantityElement.innerText=quantity,containerAtcButton&&containerAtcButton.setAttribute("style","bottom: 44px !important"),containerAtcButtonProdFaceSerum&&containerAtcButtonProdFaceSerum.forEach(btn=>btn.classList.add("new-bottom")),socialProofContainer.classList.remove("hidden"),closeIcon.addEventListener("click",function(){socialProofContainer.classList.add("hidden"),containerAtcButton&&containerAtcButton.setAttribute("style","bottom: 25px !important"),document.querySelector("iframe#launcher")&&document.querySelector("iframe#launcher").classList.remove("new-bottom")})};if(productHandle&&productList){const requests=productList.split(", ").map(id=>fetchData2(url,id));Promise.all(requests).then(responses=>{let sumPurchased=responses.reduce((acum,cur)=>acum+cur.data.itemsPurchased,0);sumPurchased>0&&renderQuantity(sumPurchased)}).catch(error=>console.log("error",error))}else productId&&fetchData2(url,productId).then(response=>{response.code==200&&renderQuantity(response.data.itemsPurchased)})}window.showOrderBy&&userLocationIP();const productComponent=document.getElementById("info-product"),resultComponent=document.getElementById("info-result"),dermaComponent=document.getElementById("info-derma");function showComponent(component){document.querySelectorAll('[id^="info-"]').forEach(component2=>{component2.classList.remove("active")}),component.classList.add("active")}if(document.querySelectorAll(".nav-button").forEach(button=>{button.addEventListener("click",function(){const buttonId=this.id;switch(document.querySelectorAll(".nav-button").forEach(btn=>{btn.classList.remove("active")}),this.classList.add("active"),buttonId){case"productButton":showComponent(productComponent);break;case"resultButton":showComponent(resultComponent);break;case"dermaButton":showComponent(dermaComponent);break}})}),document.querySelector("#new-landing-purchase")){let setupDropdowns2=function(containerSelector,buttonSelector,contentSelector){const dropdownContainers=document.querySelectorAll(containerSelector);dropdownContainers&&dropdownContainers.forEach(function(container){const dropdownButton=container.querySelector(buttonSelector),dropdownContent=container.querySelector(contentSelector),button=container.querySelector(".landing-rotate-svg-button");function toggleDropdown(){dropdownContent.classList.toggle("show-dropdown"),button.classList.toggle("rotate-svg-btn")}dropdownButton.addEventListener("click",toggleDropdown)})};var setupDropdowns=setupDropdowns2;class microInfusionPurchaseLandingPage{constructor(formId){this.form=document.getElementById(formId),this.panels=document.querySelectorAll(".landing-panel"),this.btnBack=document.getElementById("landing-back"),this.btnNext=document.getElementById("landing-next"),this.bntTest=document.getElementById("landing-test"),this.btnSubmitPanel=document.getElementById("landing-submit"),this.btnSumbitText=document.getElementById("landing-submit-text"),this.breadCrumbsItems=document.querySelectorAll(".landing-breadcrumbs-item"),this.breadCrumbsButtons=document.querySelectorAll(".landing-breadcrumbs-item__btn"),this.mobileCardContainer=document.getElementById("landing-purchase-mobile"),this.selectedInputValue=null,this.selectedInputValueJson=null,this.selectedInputValueStep4=null,this.selectedInputValueJsonStep4=null,this.selectedInputStep2Title=null,this.selectedInputStep3Title=null,this.indexPanel=0,this.initializeLandingPage(),this.initializeEventListeners()}initializeLandingPage(){this.hidePanels(),this.showActualPanel(this.indexPanel),this.updateVisibilityFirstStep(),this.updateSelectedInputValueJson(),this.renderElementsStep3(),this.updateSelectedInputValueStep4(),this.updateSelectedInputValueJsonStep4(),this.updateVisibilityAndValueFourthStep(),this.updateButtons(),this.updateVisibilityBreadcrumb(),this.renderElementMobileStep1(),this.updateSubmitTextBtn(),this.fillBreadCrumbs()}initializeEventListeners(){const firstStep2RadioButton=document.querySelector('#step2-select input[type="radio"]:checked');firstStep2RadioButton&&(this.selectedInputStep2Title=firstStep2RadioButton.dataset.title),document.querySelectorAll('#step2-select input[type="radio"]').forEach(button=>{button.addEventListener("change",this.handleStep2RadioButtonChange.bind(this))}),document.querySelectorAll('.inputs-products1 input[type="radio"], .inputs-products2 input[type="radio"], .inputs-products3 input[type="radio"]').forEach(button=>{button.addEventListener("change",this.handleStep1RadioButtonChange.bind(this))});const firstStep3RadioButton=document.querySelector('#inputs-landing-step3 input[type="radio"]:checked');firstStep3RadioButton&&(this.selectedInputStep3Title=firstStep3RadioButton.value),document.querySelectorAll('#inputs-landing-step3 input[type="radio"]').forEach(button=>{button.addEventListener("change",this.handleStep3RadioButtonChange.bind(this))}),document.querySelectorAll('.inputs-products4 input[type="radio"], .inputs-products5 input[type="radio"], .inputs-products6 input[type="radio"]').forEach(button=>{button.addEventListener("change",this.handleStep4RadioButtonChange.bind(this))}),this.btnNext.addEventListener("click",this.handleNextButtonClick.bind(this)),this.btnBack.addEventListener("click",this.handleBackButtonClick.bind(this)),this.breadCrumbsButtons.forEach((button,index)=>{button.addEventListener("click",()=>{this.handleBreadcrumbButtonClick(index)})}),this.btnSubmitPanel.addEventListener("click",this.updateAnchorValue.bind(this))}handleStep2RadioButtonChange(event){const title=event.target.dataset.title;this.selectedInputStep2Title=title,this.updateVisibilityFirstStep(),this.updateSelectedInputValueJson(),this.updateSelectedInputValueStep4(),this.updateSelectedInputValueJsonStep4(),this.updateVisibilityAndValueFourthStep(),this.renderElementsStep3(),this.renderElementMobileStep1(),this.updateSubmitTextBtn()}handleStep1RadioButtonChange(event){const button=event.target;this.syncRadioButtons(button.dataset.identifier),this.updateSelectedInputValue(),this.renderElementsStep3(),this.updateSelectedInputValueJson(),this.updateVisibilityBreadcrumb(),this.fillBreadCrumbs(),this.renderElementMobileStep1(),this.updateSubmitTextBtn()}handleStep3RadioButtonChange(event){const button=event.target;this.selectedInputStep3Title=button.value}handleStep4RadioButtonChange(event){const button=event.target;this.syncRadioButtonsStep4(button.dataset.identifier),this.updateSelectedInputValueStep4(),this.updateSelectedInputValueJsonStep4(),this.updateVisibilityAndValueFourthStep()}handleNextButtonClick(){this.nextPanel(),this.fillBreadCrumbs(),this.updateBreadcrumbContent("addText")}handleBackButtonClick(){this.backPanel(),this.fillBreadCrumbs(),this.updateBreadcrumbContent("removeText")}handleBreadcrumbButtonClick(index){this.showPanelBread(index),this.updateBreadcrumbContent("removeText")}hidePanels(){this.panels.forEach(panel=>{panel.classList.add("panel-hidden")})}showActualPanel(index){this.panels[index].classList.remove("panel-hidden")}hidePanel(index){this.panels[index].classList.add("panel-hidden")}nextPanel(){this.indexPanel<this.panels.length-1&&(this.breadCrumbsItems[this.indexPanel].classList.remove("active-breadcrumb"),this.hidePanel(this.indexPanel),this.indexPanel++,this.showActualPanel(this.indexPanel),this.updateButtons(),this.breadCrumbsButtons[this.indexPanel].removeAttribute("disabled"),this.breadCrumbsItems[this.indexPanel].classList.add("active-breadcrumb"))}showPanelBread(index){index>=0&&index<this.panels.length&&(this.breadCrumbsItems[this.indexPanel].classList.remove("active-breadcrumb"),this.hidePanels(),this.showActualPanel(index),this.breadCrumbsButtons.forEach((button,i)=>{i>index?button.setAttribute("disabled","disabled"):button.removeAttribute("disabled")}),this.breadCrumbsItems[index].classList.add("active-breadcrumb"),this.fillBreadCrumbs(),this.indexPanel=index,this.updateButtons())}updateButtons(){this.indexPanel===0?this.btnBack.classList.add("hidden"):this.btnBack.classList.remove("hidden"),this.selectedInputValueJson.position===1?this.indexPanel===this.panels.length-1?(this.btnNext.classList.add("hidden"),this.btnSubmitPanel.classList.add("show-lading-button")):(this.btnNext.classList.remove("hidden"),this.btnSubmitPanel.classList.remove("show-lading-button")):this.selectedInputValueJson.position!==1&&(this.indexPanel===this.panels.length-2?(this.btnNext.classList.add("hidden"),this.btnSubmitPanel.classList.add("show-lading-button")):(this.btnNext.classList.remove("hidden"),this.btnSubmitPanel.classList.remove("show-lading-button")))}backPanel(){this.breadCrumbsItems[this.indexPanel].classList.remove("active-breadcrumb"),this.breadCrumbsButtons[this.indexPanel].setAttribute("disabled","disabled"),this.hidePanel(this.indexPanel),this.indexPanel--,this.indexPanel<0&&(this.indexPanel=this.panels.length-1),this.showActualPanel(this.indexPanel),this.updateButtons(),this.breadCrumbsItems[this.indexPanel].classList.add("active-breadcrumb")}syncRadioButtons(value){document.querySelectorAll('.inputs-products1 input[type="radio"], .inputs-products2 input[type="radio"], .inputs-products3 input[type="radio"]').forEach(input=>{input.dataset.identifier===value&&(input.checked=!0)})}syncRadioButtonsStep4(value){document.querySelectorAll('.inputs-products4 input[type="radio"], .inputs-products5 input[type="radio"], .inputs-products6 input[type="radio"]').forEach(input=>{input.dataset.identifier===value&&(input.checked=!0)})}updateSelectedInputValueJson(){if(this.selectedInputValue)try{this.selectedInputValueJson=JSON.parse(this.selectedInputValue)}catch(error){console.error("Error parsing JSON:",error),this.selectedInputValueJson=null}else this.selectedInputValueJson=null}updateSelectedInputValueJsonStep4(){if(this.selectedInputValueStep4)try{this.selectedInputValueJsonStep4=JSON.parse(this.selectedInputValueStep4)}catch(error){console.error("Error parsing JSON:",error),this.selectedInputValueJsonStep4=null}}updateSelectedInputValue(){const selectedRadioButton=document.querySelector('.inputs-products1 input[type="radio"]:checked, .inputs-products2 input[type="radio"]:checked, .inputs-products3 input[type="radio"]:checked');this.selectedInputValue=selectedRadioButton?selectedRadioButton.value:null,this.updateSelectedInputValueJson()}updateSelectedInputValueStep4(){const selectedRadioButtonStep4=document.querySelector('.inputs-products4 input[type="radio"]:checked, .inputs-products5 input[type="radio"]:checked, .inputs-products6 input[type="radio"]:checked');this.selectedInputValueStep4=selectedRadioButtonStep4?selectedRadioButtonStep4.value:null}updateVisibilityFirstStep(){const selectOption=document.querySelector('#step2-select input[name="step2"]:checked').value;document.querySelectorAll(".inputs-products1, .inputs-products2, .inputs-products3").forEach(input=>{input.classList.remove("show-inputs")});const selectedInputs=document.querySelector(`#inputs-${selectOption}`);selectedInputs.classList.add("show-inputs");const selectedRadioButton=selectedInputs.querySelector('input[type="radio"]:checked');this.selectedInputValue=selectedRadioButton?selectedRadioButton.value:null,this.updateSelectedInputValueJson()}updateVisibilityAndValueFourthStep(){const secondRadioButtons=document.querySelector('#step2-select input[name="step2"]:checked'),selectOption=secondRadioButtons?secondRadioButtons.dataset.step4Product:null;document.querySelectorAll(".inputs-products4, .inputs-products5, .inputs-products6").forEach(input=>{input.classList.remove("show-inputs")});const selectedInputsStep4=document.querySelector(`#inputs-${selectOption}`);selectedInputsStep4.classList.add("show-inputs");const selectedRadioButtonStep4=selectedInputsStep4.querySelector('input[type="radio"]:checked');this.selectedInputValueStep4=selectedRadioButtonStep4?selectedRadioButtonStep4.value:null,this.updateSelectedInputValueJsonStep4()}renderElementsStep3(){const step3PriceNormal=document.getElementById("step3-price-normal"),step3PriceQuota=document.getElementById("step3-price-quota");step3PriceNormal&&step3PriceQuota&&(Number(this.selectedInputValueJson.price)==0?step3PriceNormal.innerHTML=`
              <span class='step3-card-price-discount'>${this.selectedInputValueJson.discountPrice}</span>
          `:step3PriceNormal.innerHTML=`
              <span class='step3-card-price-full'>${this.selectedInputValueJson.price}</span>
              <span class='step3-card-price-discount'>${this.selectedInputValueJson.discountPrice}</span>
          `,step3PriceQuota.innerHTML=`
          <span class='step3-card-price-quota'>
              ${this.selectedInputValueJson.discountPriceQuota}
          </span>
          `)}updateVisibilityBreadcrumb(){const breadCrumbWrapper=document.querySelector(".landing-breadcrumbs-wrapper"),breadCrumb4=document.querySelector(".breadStep-4"),breadCrumb3=document.querySelector(".breadStep-3");this.selectedInputValueJson.position!==1?(breadCrumbWrapper.setAttribute("data-hide-breadcrumb4","true"),breadCrumb4.classList.add("hide-breadcrumbs"),breadCrumb3.classList.add("breadcrumb-arrow-shape-end-cricle")):(breadCrumbWrapper.removeAttribute("data-hide-breadcrumb4"),breadCrumb4.classList.remove("hide-breadcrumbs"),breadCrumb3.classList.remove("breadcrumb-arrow-shape-end-cricle"))}fillBreadCrumbs(){const activeBreadcrumbIndex=Array.from(document.querySelectorAll(".landing-breadcrumbs-item")).findIndex(item=>item.classList.contains("active-breadcrumb")),hideBreadcrumb4=document.querySelector(".landing-breadcrumbs-wrapper").getAttribute("data-hide-breadcrumb4")==="true",breadCrumbs=document.querySelectorAll(".landing-breadcrumbs-item");breadCrumbs.forEach((breadCrumb,index)=>{breadCrumb.classList.remove("active-start-circle","active-arrow","active-end-circle"),index===activeBreadcrumbIndex&&(index===0?breadCrumb.classList.add("active-start-circle"):index===breadCrumbs.length-1&&!hideBreadcrumb4||index===breadCrumbs.length-2&&hideBreadcrumb4?breadCrumb.classList.add("active-end-circle"):breadCrumb.classList.add("active-arrow")),index===breadCrumbs.length-1&&hideBreadcrumb4?breadCrumb.classList.add("hide-breadcrumbs"):breadCrumb.classList.remove("hide-breadcrumbs")})}updateBreadcrumbContent(action){const breadcrumbItems=document.querySelectorAll(".landing-breadcrumbs-item");switch(action){case"addText":breadcrumbItems.forEach((item,index)=>{const button=item.querySelector(".landing-breadcrumbs-item__btn"),buttonTextSelect=button?button.querySelector(".landing-breadcrumbs-item__text--select"+(index+1)):null;!item.classList.contains("active-breadcrumb")&&!button.hasAttribute("disabled")&&(index===0?buttonTextSelect.textContent=`${this.selectedInputValueJson.titleBundle}`:index===1?buttonTextSelect.textContent=`${this.selectedInputStep2Title}`:index===2&&(buttonTextSelect.textContent=`${this.selectedInputStep3Title}`),buttonTextSelect.setAttribute("data-bc-title","true"),buttonTextSelect.previousElementSibling.classList.add("no-show-text-mobile"),buttonTextSelect.parentNode.parentNode.classList.add("breadcrumb-was-active"))});break;case"removeText":breadcrumbItems.forEach((item,index)=>{const button=item.querySelector(".landing-breadcrumbs-item__btn"),buttonTextSelect=button?button.querySelector(".landing-breadcrumbs-item__text--select"+(index+1)):null;button&&buttonTextSelect&&(button.hasAttribute("disabled")&&(buttonTextSelect.textContent="",buttonTextSelect.removeAttribute("data-bc-title"),buttonTextSelect.previousElementSibling.classList.remove("no-show-text-mobile"),buttonTextSelect.parentNode.parentNode.classList.remove("breadcrumb-was-active")),buttonTextSelect.getAttribute("data-bc-title")==="true"&&item.classList.contains("active-breadcrumb")&&(buttonTextSelect.textContent="",buttonTextSelect.removeAttribute("data-bc-title"),buttonTextSelect.previousElementSibling.classList.remove("no-show-text-mobile"),buttonTextSelect.parentNode.parentNode.classList.remove("breadcrumb-was-active")))});break;default:break}}renderElementMobileStep1(){this.mobileCardContainer.querySelectorAll("[data-position][data-input]").forEach(element=>{const positionElement=element.dataset.position,inputElement=element.dataset.input;positionElement==this.selectedInputValueJson.position&&inputElement==this.selectedInputValueJson.input?element.classList.add("show-inputs-important"):element.classList.remove("show-inputs-important")})}updateSubmitTextBtn(){const oneProductBtn=document.querySelector(".landing-button-submit-one"),bundleProductBtn=document.querySelector(".landing-button-submit-bundle");this.selectedInputValueJson.position!==3?(bundleProductBtn.classList.add("show-lading-submit-btn"),oneProductBtn.classList.remove("show-lading-submit-btn")):(bundleProductBtn.classList.remove("show-lading-submit-btn"),oneProductBtn.classList.add("show-lading-submit-btn")),this.btnSumbitText.innerHTML=`
        <span class="landing-submit-text__discount">${this.selectedInputValueJson.discountPercent} %</span>
        `}updateAnchorValue(){const anchorID=document.getElementById("landing-add-sidecard"),productIdStep1=this.selectedInputValueJson,productIdStep4=this.selectedInputValueJsonStep4;let currentHref=anchorID.getAttribute("href");const selectedProductId=productIdStep1.position===1&&productIdStep4.position===1?productIdStep4.id:(productIdStep1.position===1&&productIdStep4.position!==1,productIdStep1.id),href=currentHref.split("add")[0];productIdStep1.position===1?productIdStep4.position===1?currentHref=`${href}add?id=${selectedProductId}&selling_plan=${productIdStep4.sellingPlanId}&quantity=1`:currentHref=`${href}add?id=${selectedProductId}&quantity=1`:currentHref=`${href}add?id=${selectedProductId}&quantity=1`,anchorID.href=currentHref,setTimeout(()=>{anchorID.click()},2200)}}const purchasemicroInfusionPurchaseLandingPageLandingPage=new microInfusionPurchaseLandingPage("main-panel-lading");setupDropdowns2(".step1-value-props-dropdown",".step1-value-dropdown-title",".step1-value-dropdown-information"),setupDropdowns2(".step1-mobile-value-props-dropdown",".step1-mobile-value-dropdown-title",".step1-mobile-value-dropdown-information"),setupDropdowns2(".step4-value-props-dropdown",".step4-value-dropdown-title",".step4-value-dropdown-content")}initUpsellSwiper();const greenProductStickyBtn=document.querySelector("#green-product-sticky-btn"),greenProductStickyFormBtn=document.querySelector("#green-product-sticky-form-btn"),centerStickyButtonProductHorizontally=btn=>{if(btn){const totalLeft=(window.innerWidth-btn.offsetWidth)/2;btn.style.left=`${totalLeft}px`}};if(centerStickyButtonProductHorizontally(greenProductStickyBtn),centerStickyButtonProductHorizontally(greenProductStickyFormBtn),window.onresize=()=>{centerStickyButtonProductHorizontally(greenProductStickyBtn),centerStickyButtonProductHorizontally(greenProductStickyFormBtn)},document.querySelector(".pdm_product-landing-sales-wrapper")){const pdmProductLadingSalesSwiper=new Swiper(".pdm_swiper_product_landing",{effect:"fade",loop:!0,autoplay:{delay:3e3},mousewheel:{forceToAxis:!0},fadeEffect:{crossFade:!0},pagination:{el:".swiper-pdm-landing-sales-pagination",clickable:!0},navigation:{prevEl:".swiper-pdm-landing-sales-prev",nextEl:".swiper-pdm-landing-sales-next"}})}});
