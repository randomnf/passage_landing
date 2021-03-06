/* windows types */

let active_window_type_btn = document.querySelector(".windows-type-tabs__btn_active"),
	active_window_type_tab = document.querySelector(".window-preview-viewport__content_active-type-tab"),
	active_manufacturer_link = active_window_type_tab.querySelector(".windows-manufacturer-tabs__link_active"),
	active_manufacturer_tab = active_window_type_tab.querySelector(".windows-manufacturer-desc_active-tab");

function change_windows_type_tab(link){
	const id_target = link.getAttribute("href");
	if(!link.classList.contains("windows-type-tabs__btn_active")){
		active_window_type_btn.classList.remove("windows-type-tabs__btn_active");

		link.classList.add("windows-type-tabs__btn_active");
		active_window_type_btn = link;

		if(id_target){
			active_window_type_tab.classList.remove("window-preview-viewport__content_active-type-tab");
			active_window_type_tab = document.querySelector(id_target);
			active_window_type_tab.classList.add("window-preview-viewport__content_active-type-tab");

			let manufacturer_link = active_window_type_tab.querySelector('.windows-manufacturer-tabs__link');
			change_manufacturer_tab(manufacturer_link);
		}
	}
}

function change_manufacturer_tab(link){
	active_manufacturer_link.classList.remove("windows-manufacturer-tabs__link_active");
	active_manufacturer_link = link;
	active_manufacturer_link.classList.add("windows-manufacturer-tabs__link_active");

	const id_target = link.getAttribute("href");

	active_manufacturer_tab.classList.remove("windows-manufacturer-desc_active-tab");
	active_manufacturer_tab = active_window_type_tab.querySelector(id_target);
	active_manufacturer_tab.classList.add("windows-manufacturer-desc_active-tab");
}

const windowsTypeBtn_list = document.querySelectorAll(".windows-type-tabs__btn");

for(let i=0,btn; btn = windowsTypeBtn_list[i]; i++){
	btn.addEventListener("click",function(e){
		e.preventDefault();
		change_windows_type_tab(this);
	});
}

const manufacturerTabsBtn_list = document.querySelectorAll(".windows-manufacturer-tabs__link");

for(let i=0,btn; btn = manufacturerTabsBtn_list[i]; i++){
	btn.addEventListener("click",function(e){
		e.preventDefault();
		change_manufacturer_tab(this);
	});
}

/* calculator */

let active_calc_tab_btn = document.querySelector(".calculator-tabs__btn_active"),
	active_calc_tab = document.querySelector(".calculator-content_active-tab");

const calculatorTabsBtn_list = document.querySelectorAll(".calculator-tabs__btn");

for(let i=0,btn; btn = calculatorTabsBtn_list[i]; i++){
	btn.addEventListener("click",function(e){
		e.preventDefault();

		if(!this.classList.contains("calculator-tabs__btn_active")){
			active_calc_tab_btn.classList.remove("calculator-tabs__btn_active");
			active_calc_tab_btn = this;
			active_calc_tab_btn.classList.add("calculator-tabs__btn_active");

			const id_target = this.getAttribute("data-target");

			if(id_target){
				active_calc_tab.classList.remove("calculator-content_active-tab");
				active_calc_tab = document.querySelector(id_target);
				active_calc_tab.classList.add("calculator-content_active-tab");
			}
		}
	});
}

const design_step_btn = document.querySelector(".calc-design-step-btn");

if(design_step_btn){
	design_step_btn.addEventListener("click", function(e){
		e.preventDefault();

		active_calc_tab_btn.classList.remove("calculator-tabs__btn_active");
		active_calc_tab_btn = document.querySelector(".calculator-tabs__btn[data-target='#design']");
		active_calc_tab_btn.classList.add("calculator-tabs__btn_active");

		active_calc_tab.classList.remove("calculator-content_active-tab");
		active_calc_tab = document.querySelector("#design");
		active_calc_tab.classList.add("calculator-content_active-tab");
	});
}

let active_window_model_btn = document.querySelector(".windows-model-list .calc-list__btn_active"),
	active_window_component_btn = document.querySelector(".windows-components-list .windows-components-list__btn_active"),
	active_component_group = document.querySelector(".prop-group_active");

const windowModelBtn_list = document.querySelectorAll(".windows-model-list .calc-list__btn"),
	windowComponentsBtn_list = document.querySelectorAll(".windows-components-list .windows-components-list__btn");

for(let i=0,btn; btn = windowModelBtn_list[i]; i++){
	btn.addEventListener("click",function(e){
		e.preventDefault();
		if(!this.classList.contains("calc-list__btn_active")){
			active_window_model_btn.classList.remove("calc-list__btn_active");
			this.classList.add("calc-list__btn_active");
			active_window_model_btn = this;
		}
	});
}

for(let i=0,btn; btn = windowComponentsBtn_list[i]; i++){
	btn.addEventListener("click",function(e){
		e.preventDefault();
		if(!this.classList.contains("windows-components-list__btn_active")){
			active_window_component_btn.classList.remove("windows-components-list__btn_active");
			active_window_component_btn = this;
			active_window_component_btn.classList.add("windows-components-list__btn_active");

			active_component_group.classList.remove("prop-group_active");
			let target = this.getAttribute("data-target");
			active_component_group = document.querySelector("."+target);
			active_component_group.classList.add("prop-group_active");
		}
	});
}

let prices = {
	//базовая цена окна
	'base': 1000,
	//цена за м^2 окна
	'sqrMeter': 1000,
	//цена профиля
	'profile': 1000,
	//цена фурнитура
	'fittings': 1000,
	//цена за тип окна
	'type': 1000,
	//цена за тип стеклопакета
	'glassType': 1000,
	//цена за расцветку рамы
	'frame': 0,
	//цена за расцветку фурнитуры
	'fittingsColor': 0,
	//цена за тонировку
	'toning': 0,
	//цена за раскладку
	'layout': 0,
	//цена за расцветку откоса
	'slop': 0,
	//цена за расцветку подконника
	'sill': 0
};

function number_format(number, decimals, dec_point, separator ) {
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof separator === 'undefined') ? ',' : separator ,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function(n, prec) {
			var k = Math.pow(10, prec);
			return '' + (Math.round(n * k) / k)
				.toFixed(prec);
		};
	// Фиксим баг в IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
		.split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '')
		.length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1)
			.join('0');
	}
	return s.join(dec);
}

function calcSqrPrice(){
	//из мм переводим в метры и считаем площадь окна в м^2
	let sqrM = (calcWidthValue / 1000) * (calcHeightValue / 1000);

	//возвращаем стоимость на м^2
	return (sqrM * prices.sqrMeter);
}

function recalсSum(){
	return (prices.base +
			calcSqrPrice() +
			prices.profile +
			prices.fittings +
			prices.type +
			prices.glassType +
			prices.frame +
			prices.fittingsColor +
			prices.toning +
			prices.layout +
			prices.slop +
			prices.sill
		);
}

const sumOutput = document.querySelector(".window-price-value");

function showSum(){
	let sum = recalсSum();

	sumOutput.innerHTML = number_format(sum, 0, '.', " " );
}

let active_profile_btn = document.querySelector(".calc-prop-btn_type_profile.calc-prop-btn_active"),
	active_fittings_btn = document.querySelector(".calc-prop-btn_type_fittings.calc-prop-btn_active"),
	active_type_btn = document.querySelector(".calc-prop-btn_type_type.calc-prop-btn_active"),
	active_glassType_btn = document.querySelector(".calc-prop-btn_type_glass-type.calc-prop-btn_active");

const calcProfileBtn_list = document.querySelectorAll(".calc-prop-btn.calc-prop-btn_type_profile"),
	calcFittingsBtn_list = document.querySelectorAll(".calc-prop-btn.calc-prop-btn_type_fittings"),
	calcTypeBtn_list = document.querySelectorAll(".calc-prop-btn.calc-prop-btn_type_type"),
	calcGlassTypeBtn_list = document.querySelectorAll(".calc-prop-btn.calc-prop-btn_type_glass-type");

for(let i=0,btn; btn = calcProfileBtn_list[i]; i++){
	btn.addEventListener("click", function(e){
		e.preventDefault();
		if(!this.classList.contains("calc-prop-btn_active")){
			active_profile_btn.classList.remove("calc-prop-btn_active");
			active_profile_btn = this;
			active_profile_btn.classList.add("calc-prop-btn_active");

			let output_target = document.querySelector(".profile-target"),
				text_value = this.getAttribute("data-value"),
				img_value = this.getAttribute("data-value-img");
			if(output_target.tagName == "IMG" && img_value){
				output_target.setAttribute("src",img_value);
				output_target.setAttribute("alt",text_value);
			}
			else if(output_target.tagName == "OUTPUT"){
				output_target.innerHTML = text_value;
			}

			prices.profile = parseFloat(this.getAttribute("data-price"));
			showSum();
		}
	});
}

for(let i=0,btn; btn = calcFittingsBtn_list[i]; i++){
	btn.addEventListener("click", function(e){
		e.preventDefault();
		if(!this.classList.contains("calc-prop-btn_active")){
			active_fittings_btn.classList.remove("calc-prop-btn_active");
			active_fittings_btn = this;
			active_fittings_btn.classList.add("calc-prop-btn_active");

			let output_target = document.querySelector(".fittings-target"),
				text_value = this.getAttribute("data-value"),
				img_value = this.getAttribute("data-value-img");
			if(output_target.tagName == "IMG" && img_value){
				output_target.setAttribute("src",img_value);
				output_target.setAttribute("alt",text_value);
			}
			else if(output_target.tagName == "OUTPUT"){
				output_target.innerHTML = text_value;
			}

			prices.fittings = parseFloat(this.getAttribute("data-price"));
			showSum();
		}
	});
}

for(let i=0,btn; btn = calcTypeBtn_list[i]; i++){
	btn.addEventListener("click", function(e){
		e.preventDefault();
		if(!this.classList.contains("calc-prop-btn_active")){
			active_type_btn.classList.remove("calc-prop-btn_active");
			active_type_btn = this;
			active_type_btn.classList.add("calc-prop-btn_active");

			let output_target = document.querySelector(".type-target"),
				text_value = this.getAttribute("data-value"),
				img_value = this.getAttribute("data-value-img");
			if(output_target.tagName == "IMG" && img_value){
				output_target.setAttribute("src",img_value);
				output_target.setAttribute("alt",text_value);
			}
			else if(output_target.tagName == "OUTPUT"){
				output_target.innerHTML = text_value;
			}

			prices.type = parseFloat(this.getAttribute("data-price"));
			showSum();
		}
	});
}

for(let i=0,btn; btn = calcGlassTypeBtn_list[i]; i++){
	btn.addEventListener("click", function(e){
		e.preventDefault();
		if(!this.classList.contains("calc-prop-btn_active")){
			active_glassType_btn.classList.remove("calc-prop-btn_active");
			active_glassType_btn = this;
			active_glassType_btn.classList.add("calc-prop-btn_active");

			let output_target = document.querySelector(".glass-type-target"),
				text_value = this.getAttribute("data-value"),
				img_value = this.getAttribute("data-value-img");
			if(output_target.tagName == "IMG" && img_value){
				output_target.setAttribute("src",img_value);
				output_target.setAttribute("alt",text_value);
			}
			else if(output_target.tagName == "OUTPUT"){
				output_target.innerHTML = text_value;
			}

			prices.glassType = parseFloat(this.getAttribute("data-price"));
			showSum();
		}
	});
}

const calcWindowsSizeInput_list = document.querySelectorAll(".calc-input");

let calcWidthValue = 0,
	calcHeightValue = 0;

for(let i=0,inp; inp = calcWindowsSizeInput_list[i]; i++){
	if(inp.classList.contains("calc-input_type_width")){
		calcWidthValue = inp.value;
		inp.addEventListener("change", function(e){
			calcWidthValue = this.value;
			document.querySelector(".window-width-value").innerHTML = calcWidthValue;
			showSum();
		});
	}
	else{
		calcHeightValue = inp.value;
		inp.addEventListener("change", function(e){
			calcHeightValue = this.value;
			document.querySelector(".window-height-value").innerHTML = calcHeightValue;
			showSum();
		});
	}
}

let active_frame_btn = document.querySelector(".calc-color-btn_type_frame.calc-color-btn_active"),
	active_fittingsCol_btn = document.querySelector(".calc-color-btn_type_fittings.calc-color-btn_active"),
	active_toning_btn = document.querySelector(".calc-color-btn_type_toning.calc-color-btn_active"),
	active_layout_btn = document.querySelector(".calc-color-btn_type_layout.calc-color-btn_active"),
	active_slop_btn = document.querySelector(".calc-color-btn_type_slop.calc-color-btn_active"),
	active_sill_btn = document.querySelector(".calc-color-btn_type_sill.calc-color-btn_active");

const calcFrameBtn_list = document.querySelectorAll(".calc-color-btn_type_frame"),
	calcFittingsColBtn_list = document.querySelectorAll(".calc-color-btn_type_fittings"),
	calcToningBtn_list = document.querySelectorAll(".calc-color-btn_type_toning"),
	calcLayoutBtn_list = document.querySelectorAll(".calc-color-btn_type_layout"),
	calcSlopBtn_list = document.querySelectorAll(".calc-color-btn_type_slop"),
	calcSillBtn_list = document.querySelectorAll(".calc-color-btn_type_sill"),

	calc_res_fittings = document.querySelector(".calc-res-fittings"),
	calc_res_layout = document.querySelector(".calc-res-layout"),
	calc_res_slop = document.querySelector(".calc-res-slop"),
	calc_res_frame = document.querySelector(".calc-res-frame"),
	calc_res_sill = document.querySelector(".calc-res-sill"),
	calc_res_toning = document.querySelector(".calc-res-toning"),

	config_group_frame = document.querySelector(".calculator-config__group_type_frame"),
	config_group_fittings = document.querySelector(".calculator-config__group_type_fittings"),
	config_group_toning = document.querySelector(".calculator-config__group_type_toning"),
	config_group_layout = document.querySelector(".calculator-config__group_type_layout"),
	config_group_slop = document.querySelector(".calculator-config__group_type_slop"),
	config_group_sill = document.querySelector(".calculator-config__group_type_sill");

function change_img(url, target){
	let img = document.createElement("img"),
		style = "";

	if(url == "none"){
		target.style.backgroundImage = url;
	}
	else{
		img.addEventListener("load", function(e){
			style = "url(" + url + ")";
			target.style.backgroundImage = style;
		});
		img.setAttribute("src", url);
	}
}

for(let i=0,btn; btn = calcFrameBtn_list[i]; i++){
	btn.addEventListener("click", function(e){
		e.preventDefault();

		if(!this.classList.contains("calc-color-btn_active")){
			active_frame_btn.classList.remove("calc-color-btn_active");
			active_frame_btn = this;
			active_frame_btn.classList.add("calc-color-btn_active");

			change_img(this.getAttribute("data-pic"), calc_res_frame);

			if(!this.classList.contains("calc-color-btn_default-option")){
				config_group_frame.classList.remove("config-group_hidden");
				config_group_frame.querySelector(".config-group__color").style = this.querySelector(".calc-color-btn__img").getAttribute("style");
				config_group_frame.querySelector(".config-group__text").innerHTML = this.querySelector(".calc-color-btn__text").innerHTML;
			}
			else{
				config_group_frame.classList.add("config-group_hidden");
				config_group_frame.querySelector(".config-group__color").style = "";
				config_group_frame.querySelector(".config-group__text").innerHTML = "";
			}

			prices.frame = parseFloat(this.getAttribute("data-price"));
			showSum();
		}
	});
}

for(let i=0,btn; btn = calcFittingsColBtn_list[i]; i++){
	btn.addEventListener("click", function(e){
		e.preventDefault();

		if(!this.classList.contains("calc-color-btn_active")){
			active_fittingsCol_btn.classList.remove("calc-color-btn_active");
			active_fittingsCol_btn = this;
			active_fittingsCol_btn.classList.add("calc-color-btn_active");

			change_img(this.getAttribute("data-pic"), calc_res_fittings);

			if(!this.classList.contains("calc-color-btn_default-option")){
				config_group_fittings.classList.remove("config-group_hidden");
				config_group_fittings.querySelector(".config-group__color").style = this.querySelector(".calc-color-btn__img").getAttribute("style");
				config_group_fittings.querySelector(".config-group__text").innerHTML = this.querySelector(".calc-color-btn__text").innerHTML;
			}
			else{
				config_group_fittings.classList.add("config-group_hidden");
				config_group_fittings.querySelector(".config-group__color").style = "";
				config_group_fittings.querySelector(".config-group__text").innerHTML = "";
			}

			prices.fittings = parseFloat(this.getAttribute("data-price"));
			showSum();
		}
	});
}

for(let i=0,btn; btn = calcToningBtn_list[i]; i++){
	btn.addEventListener("click", function(e){
		e.preventDefault();

		if(!this.classList.contains("calc-color-btn_active")){
			active_toning_btn.classList.remove("calc-color-btn_active");
			active_toning_btn = this;
			active_toning_btn.classList.add("calc-color-btn_active");

			calc_res_toning.style.backgroundColor = this.getAttribute("data-color");

			if(!this.classList.contains("calc-color-btn_default-option")){
				config_group_toning.classList.remove("config-group_hidden");
				config_group_toning.querySelector(".config-group__color").style = this.querySelector(".calc-color-btn__img").getAttribute("style");
				config_group_toning.querySelector(".config-group__text").innerHTML = this.querySelector(".calc-color-btn__text").innerHTML;
			}
			else{
				config_group_toning.classList.add("config-group_hidden");
				config_group_toning.querySelector(".config-group__color").style = "";
				config_group_toning.querySelector(".config-group__text").innerHTML = "";
			}

			prices.toning = parseFloat(this.getAttribute("data-price"));
			showSum();
		}
	});
}

for(let i=0,btn; btn = calcLayoutBtn_list[i]; i++){
	btn.addEventListener("click", function(e){
		e.preventDefault();

		if(!this.classList.contains("calc-color-btn_active")){
			active_layout_btn.classList.remove("calc-color-btn_active");
			active_layout_btn = this;
			active_layout_btn.classList.add("calc-color-btn_active");

			change_img(this.getAttribute("data-pic"), calc_res_layout);

			if(!this.classList.contains("calc-color-btn_default-option")){
				config_group_layout.classList.remove("config-group_hidden");
				config_group_layout.querySelector(".config-group__color").style = this.querySelector(".calc-color-btn__img").getAttribute("style");
				config_group_layout.querySelector(".config-group__text").innerHTML = this.querySelector(".calc-color-btn__text").innerHTML;
			}
			else{
				config_group_layout.classList.add("config-group_hidden");
				config_group_layout.querySelector(".config-group__color").style = "";
				config_group_layout.querySelector(".config-group__text").innerHTML = "";
			}

			prices.layout = parseFloat(this.getAttribute("data-price"));
			showSum();
		}
	});
}

for(let i=0,btn; btn = calcSlopBtn_list[i]; i++){
	btn.addEventListener("click", function(e){
		e.preventDefault();

		if(!this.classList.contains("calc-color-btn_active")){
			active_slop_btn.classList.remove("calc-color-btn_active");
			active_slop_btn = this;
			active_slop_btn.classList.add("calc-color-btn_active");

			change_img(this.getAttribute("data-pic"), calc_res_slop);

			if(!this.classList.contains("calc-color-btn_default-option")){
				config_group_slop.classList.remove("config-group_hidden");
				config_group_slop.querySelector(".config-group__color").style = this.querySelector(".calc-color-btn__img").getAttribute("style");
				config_group_slop.querySelector(".config-group__text").innerHTML = this.querySelector(".calc-color-btn__text").innerHTML;
			}
			else{
				config_group_slop.classList.add("config-group_hidden");
				config_group_slop.querySelector(".config-group__color").style = "";
				config_group_slop.querySelector(".config-group__text").innerHTML = "";
			}

			prices.slop = parseFloat(this.getAttribute("data-price"));
			showSum();
		}
	});
}

for(let i=0,btn; btn = calcSillBtn_list[i]; i++){
	btn.addEventListener("click", function(e){
		e.preventDefault();

		if(!this.classList.contains("calc-color-btn_active")){
			active_sill_btn.classList.remove("calc-color-btn_active");
			active_sill_btn = this;
			active_sill_btn.classList.add("calc-color-btn_active");

			change_img(this.getAttribute("data-pic"), calc_res_sill);

			if(!this.classList.contains("calc-color-btn_default-option")){
				config_group_sill.classList.remove("config-group_hidden");
				config_group_sill.querySelector(".config-group__color").style = this.querySelector(".calc-color-btn__img").getAttribute("style");
				config_group_sill.querySelector(".config-group__text").innerHTML = this.querySelector(".calc-color-btn__text").innerHTML;
			}
			else{
				config_group_sill.classList.add("config-group_hidden");
				config_group_sill.querySelector(".config-group__color").style = "";
				config_group_sill.querySelector(".config-group__text").innerHTML = "";
			}

			prices.sill = parseFloat(this.getAttribute("data-price"));
			showSum();
		}
	});
}

const calc_reset_btn = document.querySelector(".calc-reset-btn");

if(calc_reset_btn){
	calc_reset_btn.addEventListener("click", function(e){
		e.preventDefault();

		if(!active_frame_btn.classList.contains("calc-color-btn_default-option")){
			let default_btn = document.querySelector(".calc-color-btn_type_frame.calc-color-btn_default-option");
			default_btn.click();
		}
		if(!active_fittingsCol_btn.classList.contains("calc-color-btn_default-option")){
			let default_btn = document.querySelector(".calc-color-btn_type_fittings.calc-color-btn_default-option");
			default_btn.click();
		}
		if(!active_toning_btn.classList.contains("calc-color-btn_default-option")){
			let default_btn = document.querySelector(".calc-color-btn_type_toning.calc-color-btn_default-option");
			default_btn.click();
		}
		if(!active_layout_btn.classList.contains("calc-color-btn_default-option")){
			let default_btn = document.querySelector(".calc-color-btn_type_layout.calc-color-btn_default-option");
			default_btn.click();
		}
		if(!active_slop_btn.classList.contains("calc-color-btn_default-option")){
			let default_btn = document.querySelector(".calc-color-btn_type_slop.calc-color-btn_default-option");
			default_btn.click();
		}
		if(!active_sill_btn.classList.contains("calc-color-btn_default-option")){
			let default_btn = document.querySelector(".calc-color-btn_type_sill.calc-color-btn_default-option");
			default_btn.click();
		}
	});
}

/* faq */

let active_faq_question = document.querySelector(".faq-list__item_active");

const faqLink_list = document.querySelectorAll(".faq-list__link");

for(let i=0,lnk; lnk = faqLink_list[i]; i++){
	lnk.addEventListener("click" ,function(e){
		e.preventDefault();
		const parent = this.parentNode;
		if(!parent.classList.contains("faq-list__item_active")){
			active_faq_question.classList.remove("faq-list__item_active");
			parent.classList.add("faq-list__item_active");
			active_faq_question = parent;
		}
	});
}

/* menu */

const open_menu_btn = document.querySelector(".hamburger-btn"),
	menu = document.querySelector(".main-menu"),
	overlay = document.querySelector(".mobile-menu-overlay"),
	close_menu_btn = overlay.querySelector(".mobile-menu-overlay__close-btn"),
	page = document.querySelector(".page");

open_menu_btn.addEventListener("click", function(e){
	e.preventDefault();

	page.classList.add("page_state_fixed");
	overlay.classList.add("mobile-menu-overlay_opened");
	menu.classList.add("main-menu_state_fixed");
});

close_menu_btn.addEventListener("click", function(e){
	e.preventDefault();

	page.classList.remove("page_state_fixed");
	overlay.classList.remove("mobile-menu-overlay_opened");
	menu.classList.remove("main-menu_state_fixed");
});

window.addEventListener("keydown",function(e){
	if (e.keyCode==27 && page.classList.contains("page_state_fixed")){
		close_menu_btn.click();
	}
});

$(window).mouseup(function(e){
	let $menu = $(menu);
	if(page.classList.contains("page_state_fixed") && !$menu.is(e.target) && $menu.has(e.target).length === 0){
		close_menu_btn.click();
	}
});

function get_viewport_width(){
	return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

function get_viewport_height(){
	return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

$(window).bind('scroll', function (){
	const nav = document.querySelector(".main-navigation");

	let viewport_width = get_viewport_width(),
		viewport_height = get_viewport_height();

	if(($(window).scrollTop() > viewport_height) && (viewport_width > 767))
	{
		if(nav.classList.contains("main-navigation_state_fixed") == false){
			nav.classList.add('main-navigation_state_fixed');
		}
	}
	else
	{
		nav.classList.remove('main-navigation_state_fixed');
	}
});

/* callbacl form */

const callback_submit_btn = document.querySelector(".callback-form__submit-btn");

if(callback_submit_btn){
	callback_submit_btn.addEventListener("click", function(e){
		e.preventDefault();

		let _form = this.form,
			_path = _form.getAttribute("action");

		if(_form.reportValidity()){
			$.ajax({
				url: _path,
				type: "POST",
				dataType: "html",
				data: $(_form).serialize(),
				success: function(response){
					_form.reset();
				},
				error: function (jqXHR,exception){

				}
			});
		}
	});
}

/* mansard page */
/* windows types */

let active_window_mansard_type_btn = document.querySelector(".mansard-list__btn_active"),
	active_window_mansard_type_tab = document.querySelector(".window-preview-viewport__content_active-type-tab");

function change_windows_type_tab__mansard(link){
	const id_target = link.getAttribute("href");
	if(!link.classList.contains("mansard-list__btn_active")){
		active_window_mansard_type_btn.classList.remove("mansard-list__btn_active");

		link.classList.add("mansard-list__btn_active");
		active_window_mansard_type_btn = link;

		if(id_target){
			active_window_mansard_type_tab.classList.remove("window-preview-viewport__content_active-type-tab");
			active_window_mansard_type_tab = document.querySelector(id_target);
			active_window_mansard_type_tab.classList.add("window-preview-viewport__content_active-type-tab");
		}
	}
}

const windowsMansardTypeBtn_list = document.querySelectorAll(".mansard-list__btn");

for(let i=0,btn; btn = windowsMansardTypeBtn_list[i]; i++){
	btn.addEventListener("click",function(e){
		e.preventDefault();
		change_windows_type_tab__mansard(this);
	});
}
