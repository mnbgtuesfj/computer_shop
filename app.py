# [render_template]，渲染模板，因此它需要一個『模板』來提供渲染的格式。
# [request]以requests 模組建立適當的 HTTP 請求，透過 HTTP 請求從網頁伺服器下載指定的資料
# [jsonify]將python對象如:字典dict或列表list轉換成json
# [session]Session 就像是飲料店的號碼牌，使用者拿號碼牌去和 Server 要資料，Server 會跟據這號碼牌，認定你是顧客、是否點過餐、知道你點了什麼東西，然後可以給你屬於你的飲料。
from flask import Flask, render_template, request, jsonify, session
import mysql.connector

# 創建Flask物件app並初始化
app = Flask(__name__)

# 防止Flask的jsonify對數據進行排序
app.config['JSON_SORT_KEYS'] = False    

# session開始前要設定好secret_key
app.config['SECRET_KEY'] = b'\x99\xd3\xd4C*h\xe0\x8c\xf3\xa2L5q\xf71\xaa'

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="qaz4545112",
    database="computer_shopping"
)

# 通過python render_template的方法定義路由地址
@ app.route("/")
def index():
    return render_template("index.html")

@ app.route("/product_info")
def product_info_get():
    return  render_template("product_info.html")


@ app.route("/product_info/product_description")
def product_description():
    return render_template("product_description.html")

@ app.route("/login")
def login():
    return render_template("login.html")

@ app.route("/cart")
def cart():
    return render_template("cart.html")

@ app.route("/cart_order")
def cart_order():
    return render_template("cart_order.html")

@ app.route("/product_news_1")
def news_1():
    return render_template("product_news_1.html") 

@ app.route("/product_news_2")
def news_2():
    return render_template("product_news_2.html") 

@ app.route("/product_news_3")
def news_3():
    return render_template("product_news_3.html") 

@ app.route("/product_news_4")
def news_4():
    return render_template("product_news_4.html") 

@ app.route("/product_news_5")
def news_5():
    return render_template("product_news_5.html") 

@ app.route("/product_news_6")
def news_6():
    return render_template("product_news_6.html") 

@ app.route("/product_news_7")
def news_7():
    return render_template("product_news_7.html") 

@ app.route("/product_news_8")
def news_8():
    return render_template("product_news_8.html")

@ app.route("/order_complete")
def order_complete():
    return render_template("order_complete.html")      

# 登入
@ app.route("/login", methods=["PATCH"])
def member_login():
    if request.method == "PATCH":
        Email = request.form.get("登入帳號")
        Password = request.form.get("登入密碼")
    # 如果獲取的資料為空
    if len(Email) == 0 or len(Password) == 0:
        return {'message': "帳號密碼錯誤"}
    else:
        with mydb.cursor() as cursor:
            sql_login = ("Select * From computer_shopping.member Where account = '" +
                         Email + "' AND password = '" + Password + "'")

            print(sql_login)
            cursor.execute(sql_login)  # execute():執行sql語句
            # mydb.commit()
            result = cursor.fetchall()  # fetchall():接收全部的返回結果行
            print("result",result)
            mydb.close  # 關資料庫
            if len(result) == 0:
                return {'message': "帳號密碼錯誤"}
            else:
                session['login_success'] = "已登入"
                session['Email'] = Email
                print("110行，是否有登入:",session['login_success'])
                print("111行，登入後的帳號:",session['Email'])
                return {'message': "登入成功"}
@app.route("/api/logout")
def logout():
    session.clear()
    # session['Email']=False
    return render_template("index.html")

@ app.route("/api/login", methods=["GET"]) 
def member_login_success():
    # session['login_success']='no_value'
    login_success = session['login_success']
    print("122行",login_success)
    print("123行",session['Email'])
    # print("AAAAAAAAAAAAAAAAAAA",login_success)
    # session['login_success'] = ""
    if login_success == "已登入":
        print("已登入，很乖!")
        data_info = {"message":session['login_success']}
        jsObj = jsonify(data_info)
        return jsObj
    else:
        print("要登入喔!")
        data_info = {"message":"請先登入"}
        jsObj = jsonify(data_info)
        return jsObj

# 註冊
@ app.route("/login", methods=["POST"])
def member_register():
    if request.method == "POST":
        Email = request.form.get("Email")
        Password = request.form.get("密碼")
        name = request.form.get("姓名")
        phone = request.form.get("手機號碼")
        address = request.form.get("地址")
        try:
            with mydb.cursor() as cursor:
                sql = ("Select * From member Where account = '" + Email + "'")
                print(sql)
                cursor.execute(sql)
                result = cursor.fetchall()
                mydb.close  # 關資料庫
                # print("123132132131132123132")
                if len(result) == 0:
                    sql_register = (
                        "Insert Into member (account, password, name, phone, address) Values(%s, %s, %s, %s, %s)")
                    val = (Email, Password, name, phone, address)
                    cursor.execute(sql_register, val)
                    mydb.commit()
                    mydb.close  # 關資料庫
                    data_info = {'message': "註冊成功"}
                    jsObj = jsonify(data_info)
                    return jsObj
                else:
                    data_info = {'message': "註冊失敗"}
                    jsObj = jsonify(data_info)
                    return jsObj
        except:
            data_info = {'error': 'true',
                         'message': '伺服器內部錯誤'}
            jsObj = jsonify(data_info)
            return jsObj

# #將mysql裡的cpu資料表的name、price、image傳到後端。
@ app.route("/api/product_info",methods=["GET"])
def api_product_info_get_1():
    Data_info=[]
    with mydb.cursor() as cursor:
        sql = ("SELECT pName,price,image_title,pNo FROM computer_shopping.cpu;")
        cursor.execute(sql)
        result = cursor.fetchall()
        mydb.close  # 關資料庫
        for row in result:
            data_info={"name":row[0],"price":row[1],"image_title":row[2],"pNo":row[3]}
            Data_info.append(data_info)
        print("Data_info", Data_info)
        
        # print(jsonify(Data_info))

        return jsonify(Data_info)

# #將mysql裡的cpu資料表的feature、price、pNo、core、thread、speed、cache_memory、cpu_process、tdp、memory_type、cpu_foot、image傳到後端。
@ app.route("/api/product_info/product_description",methods=["GET"])
def api_product_info_get_2():
    # print('商品編號', session['pNo'])
    try:
        # pNo = request.form.get("id")
        # print(pNo)
        pNo = request.args.get("id")
        # pName = 
        session['pNo']=pNo
        print('商品編號', session['pNo'])
        print(pNo)
        with mydb.cursor() as cursor:
            sql=("Select * From computer_shopping.cpu Where pNo = '" + pNo + "'")
            cursor.execute(sql)
            result = cursor.fetchall()
            print("217行: ",result)
            # print(result)
            mydb.close
            for row in result:
                data_info={"Id":row[0],"pName":row[1],"feature":row[2],"price":row[3],"pNo":row[4],"core":row[5],"thread":row[6],"speed":row[7],"cache_memory":row[8],"cpu_process":row[9],"tdp":row[10],"memory_type":row[11],"cpu_foot":row[12],"image_title":row[13],"image_main":row[14]}
            print(data_info) 
            # return data_info
            return jsonify(data_info)
    except Exception as e:
        print("post_的錯誤訊息: ",e)

@ app.route("/api/cart_insert",methods=["POST"])      
def insert_to_order():
    # pNo = session['pNo'] 
    # print(pNo)
    price = request.form.get("price")
    amount = request.form.get("amount")
    pName = request.form.get("pName")
    image_title = request.form.get("image_title")
    print("價錢",price)
    print("數量",amount)
    print("商品名稱",pName)
    print("商品圖片",image_title)
    print("-----------------------")
    pNo = session['pNo']
    print("233行，商品編號",pNo)
    try:
        # email = session['Email']
        # success = session['login_success']
        # print("236行: ",email)
        # print("238行: ",success)
        # 判斷有沒有登入
        if session['login_success'] == '已登入':
            with mydb.cursor() as cursor:
                print("242行: 有進來")
                sql_search = ("Select * From `cart` Where email = '"+ session['Email'] +"' AND pNo = '"+pNo+"'")
                print("244行: ",sql_search)
                # sql_search = ("Select * From `order` Where pNo = '"+ pNo +"'")
                cursor.execute(sql_search)
                result = cursor.fetchall()
                mydb.close
                print("249行的值: ",result)
                # 如果資料庫order沒有該商品名稱，跑insert這個程序。
                if len(result) == 0:
                    print("253行有進來")
                    with mydb.cursor() as cursor:
                        # if pNo != "":
                        print("259行有進來")
                        sql_insert=("INSERT INTO `cart`(pNo, price, amount, pName, image_title, email) VALUES(%s,%s,%s,%s,%s,%s)")
                        val = (pNo,price,amount,pName,image_title,session['Email'])
                        cursor.execute(sql_insert, val)
                        mydb.commit() # 提交至SQL
                        mydb.close
                    return {"message":"登入成功"}
                # 如果資料庫order有該商品名稱，跑update這個程序。
                else:
                    with mydb.cursor() as cursor:
                        sql_update=("UPDATE `cart` SET amount ='"+ amount +"' WHERE email ='"+ session['Email'] +"' AND pNo ='"+ pNo +"'")
                        cursor.execute(sql_update)
                        mydb.commit()
                        mydb.close
                        print("268行: ",sql_update)
                    return {"message":"更新資料內容成功"}
    except:
        return {"message":"請先登入"}

@ app.route("/api/cart_search",methods=["GET"])      
def api_cart_search():
    print("275行")
    Data_info=[]
    account = session['Email']
    with mydb.cursor() as cursor:
        if account != "":
            sql_search=("Select * From `cart` Where email = '" + account + "'")
            print("sql_search:",sql_search)
            cursor.execute(sql_search)
            result_select = cursor.fetchall()
            print("288的值: ",result_select)
            print("289的值: ",len(result_select))
            mydb.close
            for row in result_select:
                data_info={"pNo":row[0],"price":row[1],"amount":row[2],"pName":row[3],"image_title":row[4],"Email":row[5]}
                Data_info.append(data_info)
            print("293行的值: ",Data_info) 

            return jsonify(Data_info)            
    
    # with mydb.cursor() as cursor:
    #         # sql_select=("Select * From computer_shopping.cpu Where pNo = '" + pNo + "'")
    #         # # print(sql_select)
    #         # cursor.execute(sql_select)
    #         # result_select = cursor.fetchall()
    #         # mydb.close
    #         # print(result_select)   
    #         # for row in result_select:
    #         #     data_info={"price":row[3],"pName":row[1],"image_title":row[13]}
    #         #     price = data_info["price"]
    #         #     pName = data_info["pName"]
    #         #     image_title = data_info["image_title"]
    #         # print(data_info)
    #         #      
          

@ app.route("/api/delete_order",methods=["POST"])      
def delete_order():
    account=session['Email']
    pNo = request.form.get("pNo")
    print("320行: ",account)
    print("322行: ",pNo)
    with mydb.cursor() as cursor:
        sql_delete=("DELETE FROM `cart` WHERE email='"+ account +"'AND pNo ='"+ pNo +"'")
        print(sql_delete)
        cursor.execute(sql_delete)
        # result=cursor.fetchall()
        # print("326行的值: ",result)
        mydb.commit()
        mydb.close
    return "123"

@ app.route("/api/delete_order/session_clear",methods=["GET"])      
def session_clear():
    session.clear()
        
    return ""  

@ app.route("/api/to_the_order",methods=["POST"])      
def update_order():
    # print("334行")
    # for c in count
    amount_update = request.form.get("amount")
    pNo = request.form.get("pNo")
    print("--------------------")
    print("338行: ",amount_update)
    print("339行: ",pNo)

    with mydb.cursor() as cursor:
        sql_update=("UPDATE `cart` SET amount ='"+ amount_update +"' WHERE email ='"+ session['Email'] +"' AND pNo ='"+ pNo +"'")
        cursor.execute(sql_update)
        result = cursor.fetchall()
        # print("345行",result)
        mydb.commit()
        mydb.close
        print("348行",sql_update)
    return {"message":"更新成功"}

@ app.route("/api/order_confirm",methods=["POST"])      
def order_confirm():
    purchaserName = request.form.get("purchaserName")
    address = request.form.get("address")
    phone = request.form.get("phone")
    user_email = request.form.get("email")
    # email = session['Email']

    session['purchaserName'] = purchaserName
    session['address'] = address
    session['phone'] = phone
    session['user_email'] = user_email
    
    with mydb.cursor() as cursor:
        sql_select = ("Select pName,amount FROM cart where email ='"+ session['Email'] +"'")
        cursor.execute(sql_select)
        result = cursor.fetchall()
        mydb.close
        print("372行: ",result)
        for row in result:
            print("375行，pName的值: ",row[0])
            print("376行，amount的值: ",row[1])
            with mydb.cursor() as cursor:
                sql_insert = ("INSERT INTO `order`(pName, amount, Purchaser, address, phone, email, account) VALUES(%s,%s,%s,%s,%s,%s,%s)")
                val = (row[0],row[1],purchaserName,address,phone,user_email,session['Email'])
                cursor.execute(sql_insert, val)
                mydb.commit()
                mydb.close
            # data_info = {"purchaserName":session['purchaserName'],"address":session['address'],"phone":session['phone'],"user_email":session['user_email'],"pName":row[0],"amount":row[1]}
            # print("387行: ",data_info)
    return 0

@ app.route("/api/order_complete",methods=["GET"])      
def order_finish():
    Data_info=[]

    with mydb.cursor() as cursor:
        sql_select = ("Select * FROM `order` where Purchaser ='"+ session['purchaserName'] +"' AND address ='"+ session['address'] +"' AND phone ='"+ session['phone'] +"' AND email ='"+ session['user_email'] +"' AND account ='"+ session['Email'] +"'")
        cursor.execute(sql_select)
        result_2 = cursor.fetchall()
        mydb.close

    for col in result_2:    
        data_info = {"order_number":col[0],"purchase_date":col[1],"pName":col[2],"amount":col[3],"Purchaser":col[4],"address":col[5],"phone":col[6],"email":col[7]}
        Data_info.append(data_info)

    print("426行: ",Data_info)    
    return jsonify(Data_info)

@ app.route("/api/order_search",methods=["GET"])      
def order_search():
    Data_info=[]

    with mydb.cursor() as cursor:
        sql_select = ("Select * FROM `order` where account ='"+ session['Email'] +"'")
        cursor.execute(sql_select)
        result_2 = cursor.fetchall()
        mydb.close

    for col in result_2:    
        data_info = {"order_number":col[0],"purchase_date":col[1],"pName":col[2],"amount":col[3],"Purchaser":col[4],"address":col[5],"phone":col[6],"email":col[7]}
        Data_info.append(data_info)

    print("421行: ",Data_info)    
    return jsonify(Data_info)

if __name__ == '__main__':
    app.run()
