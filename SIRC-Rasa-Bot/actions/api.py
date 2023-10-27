import pandas as pd
from pymongo import MongoClient
from datetime import datetime

# client = MongoClient('mongodb://sircchatbot:Sirc%40123@172.29.106.60:27017/?authMechanism=DEFAULT&authSource=admin')  # Provide appropriate MongoDB connection details
client = MongoClient('mongodb+srv://damudheshkt:Amudhesh@cluster0.nujdztc.mongodb.net/')
db = client['SIRC_POC']
pl_details = db['pl_details']
pr_details = db['pr_details']
po_details = db['po_details']
bt_details = db['bt_details']
budget_details = db['budget_details']
#                                     PURCHASE REQUEST                                                #
def pending_pr_list():
    pr_list = []
    for i in pr_details.find():
        item = 'PR ' + str(i['pr_num'])
        pr_list.append(item)
    
    res = pr_list
    print(res)
    return res

def pr_item_list(pr_no):
    item_list = []
    
    res = pr_details.find_one({'pr_num':int(pr_no)})
    # print(res['Item_10_number'])
    i = 10
    while(i<30):
        item = {'text':"Item "+str(res[f'Item_{i}_number']), 'intent': f"PR {pr_no} Item {str(res[f'Item_{i}_number'])}" }
        item_list.append(item)
        i=i+10
     
    print(item_list)
    return item_list

def pr_item_description(pr_no,pr_item):
    des = {}
    res = pr_details.find_one({'pr_num':int(pr_no)})
    if(int(pr_item) == 10):
        des = {
            'Item Number':res['Item_10_number'],
            'Plant':res['Item_10_Plant'],
            'Total Price':res['Item_10_Total_Price'],
            'UOM':res['Item_10_UOM'],
            'Quantity':res['Item_10_Quantity'],
            'Description':res['Item_10_Description']
        }
    else:
        des = {
            'Item Number':res['Item_20_number'],
            'Plant':res['Item_20_Plant'],
            'Total Price':res['Item_20_Total_Price'],
            'UOM':res['Item_20_UOM'],
            'Quantity':res['Item_20_Quantity'],
            'Description':res['Item_20_Description']
        }

    print(des)
    return des

def pr_approval(pr_no,status,comments):
    a = pr_details.find_one({'pr_num' : int(pr_no)})
    if a['Status'] == "Pending":
        res = True
        pr_details.update_one({'pr_num': pr_no}, {"$set": {'Status': status}})
        pr_details.update_one({'pr_num': pr_no}, {"$set": {'Comments': comments}})
        
    else:
        res =  False
    print(res)
    return res
#                                     PURCHASE REQUEST                                                #

#                                          PURCHASE ORDER                                                  #


def pending_po_list():
    po_list = []
    for i in po_details.find():
        item = i['Po_num']
        po_list.append(item)
    
    res = po_list
    print(res)
    return res

def po_item_list(po_no):
    item_list = []
    res = po_details.find_one({'Po_num':po_no})
    # print(res['Item_10_number'])
    item_list.append(res[f'Item_10_Pr_item'])

    print(item_list)
    return item_list

def po_item_description(po_no):
    des = {}
    res = po_details.find_one({'Po_num':po_no})
    des = {
        'Item Number':res['Item_10_Pr_item'],
        'Plant':res['Item_10_Plant'],
        'Total Price':res['Item_10_Total_Price'],
        'UOM':res['Item_10_Uom'],
        'Quantity':res['Item_10_Quantity'],
        'Description':res['short_info'],
        'PR' : res['Item_10_Pr_number'],
        'PR_Item' : res['Item_10_Pr_item']
    }


    print(des)
    return des

def po_approval(po_no,status,comments):
    a = po_details.find_one({'Po_num' : po_no})
    if a['Status'] == "Pending":
        res = status
        po_details.update_one({'Po_num': po_no}, {"$set": {'Status': status}})
        po_details.update_one({'Po_num': po_no}, {"$set": {'Comments': comments}})

        
    else:
        res =  "Action can't be done"
    print(res)
    return res
#                                          PURCHASE ORDER                                                  #

#                                          LEAVE REQUEST                                                  #
def pending_leave_id():
    pl_list = []
    for i in pl_details.find():
        item = (i['Leave_ID'])
        pl_list.append(item)
    
    res = pl_list
    print(res)
    return res

def leave_description(pl_no):
    des = {}
    res = pl_details.find_one({'Leave_ID':pl_no})
    if res:
        des = {
            'Employee Name' : res['Employee Name'],
            'Leave Type' : res['Leave type'],
            'Leave Duration' : res['Leave Duration']
        }

    print(des)
    return(des)

def leave_approval(pl_no,status,comments):
    req = pl_details.find_one({'Leave_ID':pl_no})
    if(req['Status'] == "Pending"):
        pl_details.update_one({'Leave_ID':pl_no},{"$set":{'Status':status}})
        pl_details.update_one({'Leave_ID': pl_no}, {"$set": {'Comments': comments}})

        res = status
    else:
        res = "Action cannot be performed"

    print(res)
    return(res)

#                                          LEAVE REQUEST                                                  #

#                                          BUSINESS TRIP REQUEST                                            #

def pending_bt_list():
    bt_list = []
    for i in bt_details.find():
        item = (i['Business Trip No'])
        bt_list.append(item)
    
    res = bt_list
    print(res)
    return res

def bt_description(bt_no):
    bt_des = {}
    res = bt_details.find_one({'Business Trip No':bt_no})
    if res:
        bt_des = {
            'Employee Name' : res['Employee Name'],
            'Travel start Date' : res['Travel start Date'],
            'Travel End Date' : res['Travel End Date'],
            'Travel Type' : res['Travel Type'],
            'No. of Locations' : res['No. of Locations'],
            'Visa Required' : res['Visa Required'],
            'Stay' : res['Stay'],
        }

    print(bt_des)
    return bt_des

def bt_approval(bt_no,status,comments):
    req = bt_details.find_one({'Business Trip No':bt_no})
    if(req['Status'] == "Pending"):
        bt_details.update_one({'Business Trip No':bt_no},{"$set":{'Status':status}})
        bt_details.update_one({'Business Trip No': bt_no}, {"$set": {'Comments': comments}})

        res = status
    else:
        res = "Action cannot be performed"

    print(res)
    return(res)
#                                          BUSINESS TRIP REQUEST                                            #


#                                       BUDGET DETAILS                                                   #
def fundcentre_list():
    fc_list = []
    for i in budget_details.find():
        fc = i['Fund_centre']
        fc_list.append(fc)
    fc_final = list(set(fc_list))
    print(fc_final)
    return fc_final

def commititem_list(fc_no):
    ci_item = []
    for i in budget_details.find({'Fund_centre':fc_no}):
        ci = i['Commitment_item']
        ci_item.append(ci)

    print(ci_item)
    return ci_item

def budget_description(fc_no,ci_no):
    budget_des = {}
    for i in budget_details.find({'Fund_centre':fc_no,'Commitment_item':ci_no}):
        budget_des = {
            'Allocated_budget':i['Allocated_budget'],
            'Budget_consumed':i['Budget_consumed'],
            'Available Budget':i['Available Budget']
        }

    print(budget_des)
    return budget_des



#                                       BUDGET DETAILS                                                   #
