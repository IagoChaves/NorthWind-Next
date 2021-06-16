import threading
import pymssql
from flask import Flask, request, jsonify, abort, Response
from flask_restful import Api
import datetime
from flask_cors import CORS, cross_origin

app = Flask(__name__)
api = Api(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_EXPOSE_HEADERS'] = 'X-Total-Count'
CORS(app)

server = '0.0.0.0:1433'
database = 'Northwind'
username = 'sa'
password = 'password'
conn = pymssql.connect(server=server, database=database,
                       user=username, password=password)

conn.commit()
cur = conn.cursor()
sql = "select * from dbo.customers"
cur.execute(sql)


@app.route('/cliente', methods=['GET'])
@cross_origin()
def get_cliente():

    param_query = request.args
    cliente_id = param_query["id"]
    cur.execute("SELECT CompanyName, ContactName,ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax, CustomerID  FROM customers WHERE CustomerID = " +
                "'" + str(cliente_id) + "'")
    teste = cur.fetchall()

    teste = teste[0]

    return {
        'CompanyName': teste[0],
        'ContactName': teste[1],
        'ContactTitle': teste[2],
        'Address': teste[3],
        'City': teste[4],
        'Region': teste[5],
        'PostalCode': teste[6],
        'Country': teste[7],
        'Phone': teste[8],
        'Fax': teste[9],
        'CustomerID': teste[10]
    }


@app.route('/cliente', methods=['PUT'])
@cross_origin()
def put_cliente():

    param_query = request.args
    cliente_id = param_query["id"]
    dados = request.get_json()
    # print(dad
    # os)
    sql = 'UPDATE customers SET CompanyName = '+"'" + str(dados['CompanyName']) + "'"+', ContactName ='+"'"+str(dados['ContactName'])+"'"+' , ContactTitle=  '+"'"+str(dados['ContactTitle'])+"'"+', Address = '+"'"+str(dados['Address'])+"'"+',City= '+"'"+str(
        dados['City'])+"'"+', Region='+"'"+str(dados['Region'])+"'"+',PostalCode='+"'"+str(dados['PostalCode'])+"'"+',Country = '+"'"+str(dados['Country'])+"'"+',Phone = '+"'"+str(dados['Phone'])+"'"+',Fax= '+"'"+str(dados['Fax'])+"'"+' WHERE CustomerID = ' + "'" + str(cliente_id) + "'" + ";"
    print(sql)

    tt = cur.execute(sql)
    conn.commit()

    return {'Mensagem': 'OK'}


@app.route('/cliente', methods=['DELETE'])
@cross_origin()
def delete_cliente():
    param_query = request.args
    cliente_id = param_query["id"]

    sql3 = "select OrderID from orders WHERE CustomerID = " + \
        "'" + str(cliente_id) + "'"
    cur.execute(sql3)
    pedido = cur.fetchall()

    for p in pedido:
        cur.execute(
            "DELETE FROM [Order Details] WHERE OrderID= " "'" + str(p[0]) + "'")
        cur.execute("DELETE FROM orders WHERE OrderID= " "'" + str(p[0]) + "'")
        conn.commit()

    sql = "DELETE FROM customers WHERE CustomerID = " + \
        "'" + str(cliente_id) + "'"
    cur.execute(sql)
    conn.commit()
    return {'Mensagem': 'OK'}


@app.route('/cliente', methods=['POST'])
@cross_origin()
def post_cliente():
    dados = request.get_json()
    cliente_id = dados['CustomerID']
    cur.execute("SELECT * FROM customers WHERE CustomerID = " +
                "'" + str(cliente_id) + "'")
    valid = cur.fetchall()
    if valid != []:
        return{'ERROR': 'Cliente já existe.'}

    sql = "INSERT INTO  customers VALUES (" + "'" + str(dados['CustomerID'])+"'," + "'" + str(dados['CompanyName'])+"'," + "'" + str(dados['ContactName'])+"'," + "'" + str(dados['ContactTitle'])+"',"+"'" + str(
        dados['Address'])+"',"+"'" + str(dados['City'])+"',"+"'" + str(dados['Region'])+"'," + "'"+str(dados['PostalCode'])+"',"+"'" + str(dados['Country'])+"',"+"'" + str(dados['Phone'])+"',"+"'" + str(dados['Fax'])+"'"+")"

    cur.execute(sql)
    conn.commit()
    return({})


@app.route('/produtos', methods=['GET'])
@cross_origin()
def get_produtos():
    param_query = request.args
    offset = param_query["offset"]
    limit = param_query["limit"]

    cur.execute("SELECT p.ProductID,p.ProductName,p.UnitPrice, p.UnitsInStock, c.CategoryName from Products p join Categories c on c.CategoryID = p.CategoryID ORDER BY p.ProductID OFFSET " +
                str(int(offset)*int(limit)) + " ROWS FETCH NEXT " + str(limit) + " ROWS ONLY")

    dados = cur.fetchall()

    retorno = []
    # print(dados)

    cur.execute("select COUNT(*) as qtd from Products")
    total_count = cur.fetchone()

    for product in dados:

        F = {
            'id': str(product[0]),
            'ProductName': str(product[1]),
            'UnitPrice': str(product[2]),
            'UnitsInStock': str(product[3]),
            'CategoryName': str(product[4]),
        }

        retorno.append(F)

    res = jsonify(retorno)
    res.headers["X-Total-Count"] = total_count[0]

    return res


@app.route('/compras', methods=['GET'])
@cross_origin()
def get_compras():
  # try:
    param_query = request.args
    if "id" not in param_query.keys():
        return Response("{'Error':'ID not provided'}", status=401, mimetype='application/json')

    cliente_id = param_query["id"]
    offset = param_query["offset"]
    limit = param_query["limit"]

    sql = """select ROW_NUMBER() OVER (ORDER BY o.OrderID) id, o.OrderID, c.CustomerID, o.OrderDate, p.ProductName, p.UnitPrice, od.Quantity, ca.CategoryName from Customers c

    inner join Orders o on c.CustomerID = o.CustomerID

    inner join [Order Details] od on od.OrderID = o.OrderID

    inner join Products p on od.ProductID = p.ProductID

    inner join Categories ca on ca.CategoryID = p.CategoryID

    WHERE c.CustomerID = """ + "'" + str(cliente_id) + "'" + "ORDER BY o.OrderID  OFFSET " + str(int(offset)*int(limit)) + " ROWS FETCH NEXT " + str(limit) + " ROWS ONLY"

    cur.execute(sql)
    dados = cur.fetchall()

    lista_produtos = []

    cur.execute(
        "select count(*) as qtd from Orders o join [Order Details] od on od.OrderID = o.OrderID WHERE o.CustomerID = " + "'" + str(cliente_id) + "'")
    total_count = cur.fetchone()

    for d in dados:
        ordem = {
            'id': d[0],
            'OrderID': d[1],
            'CustomerID': d[2],
            'OrderDate': d[3].strftime("%Y-%m-%d %H:%M:%S"),
            'ProductName': d[4],
            'UnitPrice': str(d[5]),
            'Quantity': d[6],
            'CategoryName': d[7]
        }
        lista_produtos.append(ordem)

    res = jsonify(lista_produtos)
    res.headers["X-Total-Count"] = total_count[0]
    return res


@app.route('/compras', methods=['POST'])
@cross_origin()
def post_compras():
    dados = request.get_json()

    cliente_id = dados['CustomerID']
    cur.execute("SELECT * FROM customers WHERE CustomerID = " +
                "'" + str(cliente_id) + "'")
    valid = cur.fetchall()
    if valid == []:
        return Response("{'Error':'Cliente não existe'}", status=401, mimetype='application/json')

    nulo = None
    produtos = dados['Produtos']
    # sql_insert_order = "INSERT INTO  orders VALUES (" +"'"+ str(dados['OrderID'])+"'," +"'"+ str(dados['id'])+"'," +"'"+ str(nulo)+"'," +"'"+ str(dados['OrderDate'])+"',"+"'"+ str(dados['RequiredDate'])+"',"+"'"+ str(dados['ShippedDate'])+"',"+"'"+   str(dados['ShipVia'])+"',"+ "'"+str(dados['Freight'])+"',"+"'"+  str(dados['ShipName'])+"',"+"'"+  str(dados['ShipAddress'])+"',"+"'"+ str(dados['ShipCity'])+"',"+ "'"+ str(dados['ShipRegion'])+"',"+  "'"+ str(dados['ShipPostalCode'])+"',"+   "'"+ str(dados['ShipCountry'])+"'" + ")"
    sql_insert_order = "INSERT INTO  orders VALUES (" + "'" + str(dados['CustomerID'])+"'," + "'" + str("9")+"'," + "'" + str(dados['OrderDate'])+"',"+"'" + str(dados['RequiredDate'])+"',"+"'" + str(dados['ShippedDate'])+"',"+"'" + str(dados['ShipVia'])+"'," + "'"+str(
        dados['Freight'])+"',"+"'" + str(dados['ShipName'])+"',"+"'" + str(dados['ShipAddress'])+"',"+"'" + str(dados['ShipCity'])+"'," + "'" + str(dados['ShipRegion'])+"'," + "'" + str(dados['ShipPostalCode'])+"'," + "'" + str(dados['ShipCountry'])+"'" + ")"
    cur.execute(sql_insert_order)
    conn.commit()

    cur.execute("select TOP 1 OrderID from orders ORDER BY OrderID DESC")
    orderid = cur.fetchall()
    orderid = orderid[0][0]
    teste = []
    for prod in produtos:
        sql_temp = "INSERT INTO [Order Details] VALUES (" + "'" + str(orderid)+"'," + "'" + str(prod['ProductID'])+"'," + "'" + str(
            prod['UnitPrice'])+"'," + "'" + str(prod['Quantity'])+"',"+"'" + str(prod['Discount']) + "')"
        cur.execute(sql_temp)
        teste.append(cur.fetchall())
        conn.commit()
    r = []
    print(teste[0])

    for t in teste:
        j = {
            'id': t[0][0],
            'ProductName': t[0][1],
            'City': t[0][2],
            'Country': t[0][3]
        }
        r.append(j)

    return jsonify({'Compras': r})


@app.route('/clienteAll', methods=['GET'])
@cross_origin()
def get_clienteall():
    param_query = request.args
    offset = param_query["offset"]
    limit = param_query["limit"]

    cur.execute("SELECT CompanyName,ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax, CustomerID FROM customers ORDER BY CustomerID OFFSET " +
                str(int(offset)*int(limit)) + " ROWS FETCH NEXT " + str(limit) + " ROWS ONLY")
    dados = cur.fetchall()

    retorno = []
    # print(dados)

    cur.execute("select COUNT(*) as qtd from Customers")
    total_count = cur.fetchone()

    for teste in dados:

        F = {
            'CompanyName': str(teste[0]),
            'ContactName': str(teste[1]),
            'ContactTitle': str(teste[2]),
            'Address': str(teste[3]),
            'City': str(teste[4]),
            'Region': str(teste[5]),
            'PostalCode': str(teste[6]),
            'Country': str(teste[7]),
            'Phone': str(teste[8]),
            'Fax': str(teste[9]),
            'CustomerID': str(teste[10])
        }

        retorno.append(F)

    res = jsonify(retorno)
    res.headers["X-Total-Count"] = total_count[0]

    return res


@app.route('/comprasAll', methods=['GET'])
@cross_origin()
def get_comprasall():

    param_query = request.args
    offset = param_query["offset"]
    limit = param_query["limit"]

    cur.execute("Select ROW_NUMBER() OVER (ORDER BY od.OrderID) id ,od.OrderID, o.CustomerID ,p.ProductName, c.CategoryName ,od.Quantity,p.UnitPrice, od.Quantity*p.UnitPrice as 'Total' from dbo.[Order Details] od inner join dbo.Products p on p.ProductID = od.ProductID inner join dbo.Categories c on c.CategoryID = p.CategoryID inner join dbo.Orders o on o.OrderID = od.OrderID ORDER BY id OFFSET " + str(
        int(offset)*int(limit)) + " ROWS FETCH NEXT " + str(limit) + " ROWS ONLY")
    dados = cur.fetchall()

    cur.execute(
        "select COUNT(*) from [Order Details] od inner join dbo.Products p on p.ProductID = od.ProductID inner join dbo.Categories c on c.CategoryID = p.CategoryID inner join dbo.Orders o on o.OrderID = od.OrderID")
    total_count = cur.fetchone()
    retorno = []
    # print(dados)

    for teste in dados:

        F = {
            'id': str(teste[0]),
            'OrderID': str(teste[1]),
            'CustomerID': str(teste[2]),
            'ProductName': str(teste[3]),
            'CategoryName': str(teste[4]),
            'Quantity': str(teste[5]),
            'UnitPrice': str(teste[6]),
            'Total': str(teste[7]),

        }

        retorno.append(F)
    res = jsonify(retorno)
    res.headers["X-Total-Count"] = total_count[0]
    # return(jsonify(retorno))
    return res


@app.route('/top3', methods=['GET'])
@cross_origin()
def top():

    sql1 = "exec TopClientes"

    sql2 = "exec TopProdutosVendidos"

    cur.execute(sql1)
    cliente = cur.fetchall()
    cur.execute(sql2)
    vendas = cur.fetchall()
    cliente_array = []
    vendas_array = []
    print(vendas)
    for c in cliente:
        cliente_array.append({'Nome': c[0],
                              'CustomerID': c[1],
                              'Quantidade': c[2]})
    for v in vendas:
        vendas_array.append({'ProductName': v[0],
                             'CategoryName': v[1],
                             'Total': v[2]})

    return jsonify({'Clientes': cliente_array,
                    'Vendas': vendas_array})


if __name__ == "__main__":
    app.run(debug=True, host='localhost',
            port=3333)
