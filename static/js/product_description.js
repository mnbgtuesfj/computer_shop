// 中央處理器
$('.CPU-btn').click(function() {
    $('nav ul .CPU-show').toggleClass("show1");
    $('nav ul .1').toggleClass("rotate");
});
$('.CPU_INTEL-btn').click(function() {
    $('nav ul .CPU_INTEL-show').toggleClass("show1-1");
    $('nav ul .1-1').toggleClass("rotate");
});
$('.CPU_AMD-btn').click(function() {
    $('nav ul .CPU_AMD-show').toggleClass("show1-2");
    $('nav ul .1-2').toggleClass("rotate");
});

// 主機板
$('.MB-btn').click(function() {
    $('nav ul .MB-show').toggleClass("show2");
    $('nav ul .2').toggleClass("rotate");
});
$('.MB_Intel-btn').click(function() {
    $('nav ul .MB_INTEL-show').toggleClass("show2-1");
    $('nav ul .2-1').toggleClass("rotate");
});
$('.MB_AMD-btn').click(function() {
    $('nav ul .MB_AMD-show').toggleClass("show2-2");
    $('nav ul .2-2').toggleClass("rotate");
});

// 記憶體
$('.RAM-btn').click(function() {
    $('nav ul .RAM-show').toggleClass("show3");
    $('nav ul .3').toggleClass("rotate");
});

// 顯示卡
$('.VGA-btn').click(function() {
    $('nav ul .VGA-show').toggleClass("show4");
    $('nav ul .4').toggleClass("rotate");
});
$('.VGA_NVIDIA-btn').click(function() {
    $('nav ul .VGA_NVIDIA-show').toggleClass("show4-1");
    $('nav ul .4-1').toggleClass("rotate");
});
$('.VGA_AMD-btn').click(function() {
    $('nav ul .VGA_AMD-show').toggleClass("show4-2");
    $('nav ul .4-2').toggleClass("rotate");
});

// SSD固態硬碟
$('.SSD-btn').click(function() {
    $('nav ul .SSD-show').toggleClass("show5");
    $('nav ul .5').toggleClass("rotate");
});
$('.SSD_SATA-btn').click(function() {
    $('nav ul .SSD_SATA-show').toggleClass("show5-1");
    $('nav ul .5-1').toggleClass("rotate");
});
$('.SSD_M2PCIE-btn').click(function() {
    $('nav ul .SSD_M2PCIE-show').toggleClass("show5-2");
    $('nav ul .5-2').toggleClass("rotate");
});
$('.SSD_M2SATA-btn').click(function() {
    $('nav ul .SSD_M2SATA-show').toggleClass("show5-3");
    $('nav ul .5-3').toggleClass("rotate");
});


$('nav ul li').click(function() {
    $(this).addClass("active").siblings().removeClass("active");
});



window.onload = function() {
    var getUrlString = location.href;
    var url = new URL(getUrlString);
    var target = url.searchParams.get("id")
        // var jj = '123'
        // let aa = { "id": target }
        // alert(target);
    $.ajax({
        url: "/api/product_info/product_description",
        // 將資料傳到/product_info/product_description
        type: "GET",
        /*採用GET方法提交*/
        dataType: "json",
        data: { "id": target },
        success: function product_info(result) {
            // var abc = JSON.stringify(result);
            let product_get_info = document.getElementById("product_get_info");

            let product_info_box = document.createElement("div");
            product_info_box.setAttribute("class", "product_info_box");
            product_get_info.appendChild(product_info_box);

            let product_info_image = document.createElement("div");
            product_info_image.setAttribute("class", "product_info_image");
            product_info_box.appendChild(product_info_image);

            let product_info_image_1 = document.createElement("img");
            product_info_image_1.setAttribute("id", "product_info_image");
            product_info_image_1.setAttribute("src", result.image_title);
            product_info_image.appendChild(product_info_image_1);

            let product_main = document.createElement("div");
            product_main.setAttribute("class", "product_main");
            product_info_box.appendChild(product_main);

            let product_info_title = document.createElement("div");
            product_info_title.setAttribute("class", "product_info_title");
            product_main.appendChild(product_info_title);

            let p_1 = document.createElement("p");
            p_1.innerHTML = result.pName;
            p_1.setAttribute("id", "pName");
            product_info_title.appendChild(p_1);

            let product_info_feature = document.createElement("div");
            product_info_feature.setAttribute("class", "product_info_feature");
            product_main.appendChild(product_info_feature);

            let h3_1 = document.createElement("h3");
            h3_1.innerHTML = "商品特色 :";
            product_info_feature.appendChild(h3_1);

            let ul_1 = document.createElement("ul");
            product_info_feature.appendChild(ul_1);

            let cpu_feature = result.feature;
            // alert(cpu_feature);
            let cpu = [];
            cpu = cpu_feature.split(",");
            for (let i = 0; i < cpu.length; i++) {
                let li_1 = document.createElement("li");
                li_1.innerHTML = cpu[i];
                ul_1.appendChild(li_1);
            }

            let product_info_price = document.createElement("div");
            product_info_price.setAttribute("class", "product_info_price");
            product_main.appendChild(product_info_price);

            let h3_2 = document.createElement("h3");
            h3_2.innerHTML = "價格 :";
            let strong_1 = document.createElement("strong");
            strong_1.setAttribute("id", "price");
            strong_1.innerHTML = result.price;
            product_info_price.appendChild(h3_2);
            product_info_price.appendChild(strong_1);

            let product_info_amount = document.createElement("div");
            product_info_amount.setAttribute("class", "product_info_amount");
            product_main.appendChild(product_info_amount);

            let h3_3 = document.createElement("h3");
            h3_3.innerHTML = "數量 :";
            product_info_amount.appendChild(h3_3);

            let quantity = document.createElement("div");
            quantity.setAttribute("class", "quantity");
            product_info_amount.appendChild(quantity);

            let quantity__minus = document.createElement("a");
            quantity__minus.setAttribute("class", "quantity__minus");
            quantity__minus.setAttribute("href", "#");
            quantity__minus.innerHTML = "-";
            quantity.appendChild(quantity__minus);


            let quantity__input = document.createElement("input");
            quantity__input.setAttribute("class", "quantity__input");
            quantity__input.setAttribute("name", "quantity");
            quantity__input.setAttribute("type", "text");
            quantity__input.setAttribute("value", "1");
            quantity__input.setAttribute("id", "amount");
            quantity.appendChild(quantity__input);

            let quantity__plus = document.createElement("a");
            quantity__plus.setAttribute("class", "quantity__plus");
            quantity__plus.setAttribute("href", "#");
            quantity__plus.innerHTML = "+";
            quantity.appendChild(quantity__plus);

            let product_info_button = document.createElement("div");
            product_info_button.setAttribute("class", "product_info_button");
            product_main.appendChild(product_info_button);

            let addCart = document.createElement("input");
            addCart.setAttribute("type", "button");
            addCart.setAttribute("value", "加入購物車");
            addCart.setAttribute("class", "addCart");
            product_info_button.appendChild(addCart);

            let productPay = document.createElement("input");
            productPay.setAttribute("type", "button");
            productPay.setAttribute("value", "立即結帳");
            productPay.setAttribute("class", "productPay");
            // productPay.setAttribute("onclick", "location.href='/cart'");

            product_info_button.appendChild(productPay);

            let panel_group = document.createElement("div");
            panel_group.setAttribute("class", "panel-group");
            product_main.appendChild(panel_group);

            let radio1 = document.createElement("input");
            radio1.setAttribute("type", "radio");
            radio1.setAttribute("name", "panel-radio");
            radio1.setAttribute("id", "radio1");
            radio1.setAttribute("class", "panel-control");
            radio1.setAttribute("checked", "checked");
            panel_group.appendChild(radio1);

            let radio2 = document.createElement("input");
            radio2.setAttribute("type", "radio");
            radio2.setAttribute("name", "panel-radio");
            radio2.setAttribute("id", "radio2");
            radio2.setAttribute("class", "panel-control");
            panel_group.appendChild(radio2);

            let radio3 = document.createElement("input");
            radio3.setAttribute("type", "radio");
            radio3.setAttribute("name", "panel-radio");
            radio3.setAttribute("id", "radio3");
            radio3.setAttribute("class", "panel-control");
            panel_group.appendChild(radio3);

            let radio4 = document.createElement("input");
            radio4.setAttribute("type", "radio");
            radio4.setAttribute("name", "panel-radio");
            radio4.setAttribute("id", "radio4");
            radio4.setAttribute("class", "panel-control");
            panel_group.appendChild(radio4);

            let tab_group = document.createElement("div");
            tab_group.setAttribute("class", "tab-group");
            panel_group.appendChild(tab_group);

            let label_1 = document.createElement("label");
            label_1.setAttribute("for", "radio1");
            label_1.setAttribute("class", "active");
            label_1.innerHTML = "產品介紹";
            tab_group.appendChild(label_1);

            let label_2 = document.createElement("label");
            label_2.setAttribute("for", "radio2");
            label_2.innerHTML = "保固及售後服務";
            tab_group.appendChild(label_2);

            let label_3 = document.createElement("label");
            label_3.setAttribute("for", "radio3");
            label_3.innerHTML = "商品相關與退換貨";
            tab_group.appendChild(label_3);

            let label_4 = document.createElement("label");
            label_4.setAttribute("for", "radio4");
            label_4.innerHTML = "商品運送相關";
            tab_group.appendChild(label_4);

            let content_group = document.createElement("div");
            content_group.setAttribute("class", "content-group");
            panel_group.appendChild(content_group);

            let content1 = document.createElement("div");
            content1.setAttribute("class", "content1");
            content_group.appendChild(content1);

            let img_1 = document.createElement("img");
            img_1.setAttribute("src", result.image_main);
            content1.appendChild(img_1);

            let img_2 = document.createElement("img");
            img_2.setAttribute("src", "../static/images/商品規格.jpg");
            content1.appendChild(img_2);

            let table = document.createElement("table");
            table.setAttribute("border", "1");
            table.setAttribute("style", "border-collapse:collapse;");
            content1.appendChild(table);

            let tbody = document.createElement("tbody");
            table.appendChild(tbody);

            // 處理器編號
            let tr_pNo = document.createElement("tr");
            tbody.appendChild(tr_pNo);

            let td_1 = document.createElement("td");
            td_1.innerHTML = "處理器編號";
            tr_pNo.appendChild(td_1);

            let td_2 = document.createElement("td");
            td_2.innerHTML = result.pNo;
            tr_pNo.appendChild(td_2);

            // 核心數量
            let tr_core = document.createElement("tr");
            tbody.appendChild(tr_core);

            let td_3 = document.createElement("td");
            td_3.innerHTML = "核心數量";
            tr_core.appendChild(td_3);

            let td_4 = document.createElement("td");
            td_4.innerHTML = result.core;
            tr_core.appendChild(td_4);

            // 執行緒數量
            let tr_thread = document.createElement("tr");
            tbody.appendChild(tr_thread);

            let td_5 = document.createElement("td");
            td_5.innerHTML = "執行緒數量";
            tr_thread.appendChild(td_5);

            let td_6 = document.createElement("td");
            td_6.innerHTML = result.thread;
            tr_thread.appendChild(td_6);

            // 時脈速度
            let tr_speed = document.createElement("tr");
            tbody.appendChild(tr_speed);

            let td_7 = document.createElement("td");
            td_7.innerHTML = "時脈速度";
            tr_speed.appendChild(td_7);

            let td_8 = document.createElement("td");
            let aaa = result.speed.replace(",", "<br>");
            td_8.innerHTML = aaa;
            tr_speed.appendChild(td_8);

            // 快取記憶體
            let tr_cache_memory = document.createElement("tr");
            tbody.appendChild(tr_cache_memory);

            let td_9 = document.createElement("td");
            td_9.innerHTML = "快取記憶體";
            tr_cache_memory.appendChild(td_9);

            let td_10 = document.createElement("td");
            td_10.innerHTML = result.cache_memory;
            tr_cache_memory.appendChild(td_10);

            // 製程
            let tr_cpu_process = document.createElement("tr");
            tbody.appendChild(tr_cpu_process);

            let td_11 = document.createElement("td");
            td_11.innerHTML = "製程";
            tr_cpu_process.appendChild(td_11);

            let td_12 = document.createElement("td");
            td_12.innerHTML = result.cpu_process;
            tr_cpu_process.appendChild(td_12);

            // 秏電量TDP(W)
            let tr_tdp = document.createElement("tr");
            tbody.appendChild(tr_tdp);

            let td_13 = document.createElement("td");
            td_13.innerHTML = "秏電量TDP(W)";
            tr_tdp.appendChild(td_13);

            let td_14 = document.createElement("td");
            td_14.innerHTML = result.tdp;
            tr_tdp.appendChild(td_14);

            // 記憶體類型
            let tr_memory_type = document.createElement("tr");
            tbody.appendChild(tr_memory_type);

            let td_15 = document.createElement("td");
            td_15.innerHTML = "秏電量TDP(W)";
            tr_memory_type.appendChild(td_15);

            let td_16 = document.createElement("td");
            td_16.innerHTML = result.memory_type;
            tr_memory_type.appendChild(td_16);

            // 腳位
            let tr_cpu_foot = document.createElement("tr");
            tbody.appendChild(tr_cpu_foot);

            let td_17 = document.createElement("td");
            td_17.innerHTML = "腳位";
            tr_cpu_foot.appendChild(td_17);

            let td_18 = document.createElement("td");
            td_18.innerHTML = result.cpu_foot;
            tr_cpu_foot.appendChild(td_18);

            // content2
            let content2 = document.createElement("div");
            content2.setAttribute("class", "content2");
            content_group.appendChild(content2);

            let h2_1 = document.createElement("h2");
            h2_1.innerHTML = "保固說明"
            content2.appendChild(h2_1);

            let b2_1 = document.createElement("br");
            content2.appendChild(b2_1);

            let p_2 = document.createElement("p");
            p_2.innerHTML = "對商品有任何疑問嗎？"
            content2.appendChild(p_2);

            let b2_2 = document.createElement("br");
            content2.appendChild(b2_2);

            let p_3 = document.createElement("p");
            p_3.innerHTML = "本網站售後服務條款之標的僅適用於消費者於台灣地區購買之原廠產品（新品）特價品、整新品或境外購買之產品，一律依照當時所附之保固條件為準。超出售後服務保固範圍或期限者，其維修、收費相關事宜，依原廠客服中心公佈規定處理。消費者自收到購買商品七日內，發生產品不良或故障時，憑銷售憑證，並備齊 配件，以原箱包裝，向原經銷商申請更換新品，逾期則以維修方式處理。新品外觀瑕疵，屬於人為疏忽，不得請求本公司更換新品。產品送修時，請以原廠包材或適當材料（如紙箱，氣泡袋或保麗龍等）包裝，如係因包裝不當導致運送中發生之損壞，本網站恕不提供保固。"
            content2.appendChild(p_3);

            let b2_3 = document.createElement("br");
            content2.appendChild(b2_3);

            let p_4 = document.createElement("p");
            p_4.innerHTML = "產品因下列原因發生不良或損壞，不在售後服務保固範圍：";
            content2.appendChild(p_4);

            let b2_4 = document.createElement("br");
            content2.appendChild(b2_4);

            let ol_1 = document.createElement("ol");
            content2.appendChild(ol_1);

            let word = ["天災，意外，或人為疏忽", "違反產品手冊之使用提示", "組裝不當", "使用未經認可之配件", "超出允許使用之環境", "私自拆解結構", "非正常使用", "線路或零件氧化", "當做測試設備使用"];
            for (let i = 0; i < word.length; i++) {
                let li_1 = document.createElement("li");
                li_1.innerHTML = word[i];
                ol_1.appendChild(li_1);
            }

            let b2_5 = document.createElement("br");
            content2.appendChild(b2_5);

            let p_5 = document.createElement("p");
            p_5.innerHTML = "隨機之耗材，贈品及包材等均不在保固範圍之列。";
            content2.appendChild(p_5);

            let b2_6 = document.createElement("br");
            content2.appendChild(b2_6);

            let p_6 = document.createElement("p");
            p_6.innerHTML = "保固期內送修者，請將購買證明與發票證明聯列印紙本，連同產品包裝妥當一併寄回。";
            content2.appendChild(p_6);

            let b2_7 = document.createElement("br");
            content2.appendChild(b2_7);

            let h2_2 = document.createElement("h2");
            h2_2.innerHTML = "送貨及發票說明";
            content2.appendChild(h2_2);

            let b2_8 = document.createElement("br");
            content2.appendChild(b2_8);



            let title_name = ["送貨時間：", "送貨方式：", "送貨範圍：", "發票寄送：", "取消訂單：", "換貨：", "退貨：", "退貨注意事項：", "退貨詳細說明："];
            let role_content = ["您完成線上付款後約7個工作天內送達（不含週六日及國定假日） ※若商品為預購品或另行通知延後出貨，則不在上述的約定範圍，預購品請看預購品網頁約定出貨方式。 ※若因交易條件有誤或有其他本公司無法接受訂單之情形；或遇有商品無法順利出貨、缺貨或斷貨等情形，為避免您久候，本公司將以 email 通知您訂單不成立/取消訂單，並且全額退款，您將不會收到商品，請您見諒。", "將透過宅配（例如：宅配通、新竹貨運、黑貓）或是郵局送達收件地址。消費者訂購之商品若經配送兩次無法送達，再經本網站以電話與E-mail均無法聯繫超過三天者，本網站將取消該筆訂單，並且全額退款。", "限台灣本島地區，郵政信箱地址不寄送。（若有台灣本島以外地區送貨需求，收貨人地址請填台灣本島親友的地址）。", "若您選擇載明買受人統編之紙本發票，需要寄送實體發票給您，本網站每15天批次寄送發票，並不會隨貨併出，請您稍候。", "您完成訂購流程、訂單成立後，若需要取消訂單，請務必在該筆訂單出貨之前登入查詢個人訂單來申請取消訂單。", "您收到訂購商品七天內，若因為新品瑕疵而需要更換新品，請先登入本網站查詢個人訂單資訊後，使用過本站客服中心頁面「聯絡客服中心」功能告知換貨需求及訂單編號或撥打客服電話通知客服有換貨需求以及換貨原因，客服人員會盡快回覆並為您處理。本網站處理換貨一律先派宅配將您手中商品取回，檢驗確認合乎換貨規定後才將更換新品寄至您的收件地址。", "您的訂單出貨後，若需要退貨，請登入本網站使用功能來申請退貨。", "依照消費者保護法規定，AUTOBUY購物中心消費者均享有商品到貨七天猶豫期之權益。請注意七天猶豫期並非試用期，若您猶豫請勿拆封。退回商品必須是全新狀態且完整包裝 （保持商品、附件、包裝、廠商紙箱及所有附隨文件或資料之完整性），否則恕不接受 退貨。已拆封之電腦軟體、程式、錄音帶及錄影帶、CD、VCD、DVD、食品、花卉商品、衣服、服飾配件包包及耗材，除商品銷售網頁上特別載明之商品，均不接受 退貨。", "欲退貨時請先以線上客服系統填寫退貨申請表單，申請次日起3個工作天內我們將審核該退貨案件，通過審核後即透過本網站客服系統或E-mail回覆通知，並委託宅配公司於5個工作天 電話連絡前往取回商品，敬請保持電話暢通，並將原商品備妥，宅配取件後即提供簽收單據予您留存，（宅配公司僅收件，商品由特約廠商驗收）。請將商品無損及完整包裝，連同配件贈品，勿缺件，外盒勿損毀，請以廠商寄送時的包裝再原封備妥，若紙箱已遺失，請於商品外盒上再加包裝，勿直接讓商品原廠外盒粘貼宅配單或書寫文字，原廠外盒損毀或是商品缺件，將無法受理退貨或視損毀程度折扣退款金額，強烈建議您保留原商品外箱包裝等包材兩週勿丟棄。到貨七天期限內申請，逾期未申請辦理將無法辦理退貨。"]

            for (let i = 0; i < title_name.length - 5; i++) {
                let span_1 = document.createElement("span");
                span_1.setAttribute("class", "span_new");
                span_1.innerHTML = title_name[i];
                content2.appendChild(span_1);

                let span_2 = document.createElement("span");
                span_2.innerHTML = role_content[i];
                content2.appendChild(span_2);

                let br_1 = document.createElement("br");
                content2.appendChild(br_1);

                let br_2 = document.createElement("br");
                content2.appendChild(br_2);
            }

            let h2_3 = document.createElement("h2");
            h2_3.innerHTML = "取消訂單及退換貨說明";
            content2.appendChild(h2_3);

            let br_3 = document.createElement("br");
            content2.appendChild(br_3);

            for (let i = 4; i < title_name.length; i++) {
                let span_1 = document.createElement("span");
                span_1.setAttribute("class", "span_new");
                span_1.innerHTML = title_name[i];
                content2.appendChild(span_1);

                let span_2 = document.createElement("span");
                span_2.innerHTML = role_content[i];
                content2.appendChild(span_2);

                let br_1 = document.createElement("br");
                content2.appendChild(br_1);

                let br_2 = document.createElement("br");
                content2.appendChild(br_2);
            }
            /* 商品數量增減 */
            $(document).ready(function() {
                const minus = $('.quantity__minus');
                const plus = $('.quantity__plus');
                const input = $('.quantity__input');
                minus.click(function(e) {
                    // preventDefault()，是指停止事件
                    e.preventDefault();
                    var value = input.val();
                    if (value > 1) {
                        value--;
                    }
                    input.val(value);
                });

                plus.click(function(e) {
                    e.preventDefault();
                    var value = input.val();
                    value++;
                    input.val(value);
                })
            });

            productPay.onclick = function() {
                // alert(document.getElementById("price").innerHTM);
                // alert(result.price);
                // alert(quantity__input.value);
                // alert(result.pName);
                // alert(result.image_title);
                $.ajax({
                    url: "/api/cart_insert",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "price": result.price,
                        "amount": quantity__input.value,
                        "pName": result.pName,
                        "image_title": result.image_title,
                    },
                    success: function(result) {
                        if (result.message == "請先登入") {
                            alert("請先登入");
                            location.href = '/login';
                        } else
                            location.href = '/cart';
                    }
                });
            }
        }
    });
}