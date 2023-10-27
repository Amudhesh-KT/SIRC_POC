from fastapi import FastAPI

from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request,Response

from fastapi.staticfiles import StaticFiles

import pandas as pd
from pymongo import MongoClient
from datetime import datetime


# Establish a connection with MongoDB
client = MongoClient('mongodb+srv://damudheshkt:Amudhesh@cluster0.nujdztc.mongodb.net/') 
db = client['SIRC_POC'] 
pl_details = db['pl_details']
pr_details = db['pr_details']
po_details = db['po_details']
bt_details = db['bt_details']


app = FastAPI()


# Check the mounted routes
for route in app.routes:
    print(route)


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)




@app.get('/')
async def index():
    return {'message':'hello, world'}

@app.get('/welcome')
async def welcome():
    return {'message':'Welcome, Mate!'}


@app.get('/overall_data')
async def overall_data():

    overall_list = []

    pl = pl_details.find({})
    

    for i in pl:
        pl_des = {
            'id': "PL " + i['Leave_ID'],
            'name': i['Employee Name'],
            'shortText': i['Leave type'],
            'priority': i['priority'],
            'Created_on': datetime.strptime(str(i['creation_date']), '%Y-%m-%d %H:%M:%S').strftime('%d/%m/%Y'),
            'overall_status': "Ready",
            'levels': [
                {
                    'dept': i['Approver_1_Approval_Level'],
                    'name': i['Approver_1_Approver_Name'],
                    'status': i['Approver_1_Status'],
                },
                {
                    'dept': i['Approver_2_Approval_Level'],
                    'name': i['Approver_2_Approver_Name'],
                    'status': i['Approver_2_Status']
                }
            ],
            'details': {
                'id': i['Leave_ID'],
                'name': i['Employee Name'],
                'leave duration': datetime.strptime(str(i['Leave Duration']), '%Y-%m-%d %H:%M:%S').strftime('%d/%m/%Y'),
                'leaveType': i['Leave type']
            }
    }

        overall_list.append(pl_des)
    
    





    bt = bt_details.find({})
    
    for i in bt:
        bt_des = {
            'id': "BT " + str(i['Business Trip No']),
            'name': i['Employee Name'],
            'shortText': i['Travel Type'],
            'priority': i['priority'],
            'Created_on': datetime.strptime(str(i['creation_date']), '%Y-%m-%d %H:%M:%S').strftime('%d/%m/%Y'),
            'overall_status': "Ready",
            'levels': [
                {
                    'dept': i['Approver_1_Approval_Level'],
                    'name': i['Approver_1_Approver_Name'],
                    'status': i['Approver_1_Status'],
                },
                {
                    'dept': i['Approver_2_Approval_Level'],
                    'name': i['Approver_2_Approver_Name'],
                    'status': i['Approver_2_Status']
                }
            ],
            'details': {
                'Business Trip No': i['Business Trip No'],
                'Employee Name': i['Employee Name'],
                'Travel start Date': datetime.strptime(str(i['Travel start Date']), '%Y-%m-%d %H:%M:%S').strftime('%d/%m/%Y'),
                'Travel End Date': datetime.strptime(str(i['Travel End Date']), '%Y-%m-%d %H:%M:%S').strftime('%d/%m/%Y'),
                'Travel Type': i['Travel Type'],
                'No. of Locations': i['No. of Locations'],
                'Visa Required': i['Visa Required'],
                'Required Visa Exit & Re-Entry': i['Required Visa Exit & Re-Entry'],
                'Passport Number': i['Passport Number'],
                'Passport Expiry Date': datetime.strptime(str(i['Passport Expiry Date']), '%Y-%m-%d %H:%M:%S').strftime('%d/%m/%Y'),
                'Stay': i['Stay'],
                'National ID/Iqama Expiry': datetime.strptime(str(i['National ID/Iqama Expiry']), '%Y-%m-%d %H:%M:%S').strftime('%d/%m/%Y'),
                'Total No. of International Days': i['Total No. of International Days'],
                'Total No. of Domestic Days': i['Total No. of Domestic Days'],
                'Total No. of Days': i['Total No. of Days']
            }
        }
        overall_list.append(bt_des)


    po = po_details.find({})
    
    for i in po:
        po_des = {
            'id': "PO "+ str(i['Po_num']),
            'name': i['created_by'],
            'shortText': i['short_info'],
            'priority': i['priority'],
            'Created_on': datetime.strptime(i['Creation_date'], '%d.%m.%Y').strftime('%d/%m/%Y'),
            'overall_status': "Ready",
            'levels': [
                {
                    'dept': i['Approver_1_Approval_Level'],
                    'name': i['Approver_1_Approver_Name'],
                    'status': i['Approver_1_Status'],
                },
                {
                    'dept': i['Approver_2_Approval_Level'],
                    'name': i['Approver_2_Approver_Name'],
                    'status': i['Approver_2_Status']
                },
                {
                    'dept': i['Approver_3_Approval_Level'],
                    'name': i['Approver_3_Approver_Name'],
                    'status': i['Approver_3_Status']
                }
            ],
            'details': {
                'company_code': i['Company_code'],
                'po_creation_date': datetime.strptime(i['Creation_date'], '%d.%m.%Y').strftime('%d/%m/%Y'),
                'buyer_participants': i['Buyer_participants'],
                'total_order_value': i['Ordered_value_SAR'],
                'total_allocation_budget': i['Total_allocated_budget'],
                'budget_consumed': i['Budget_consumed'],
                'procurement_type': i['Procurement_type'],
                'supplier': i['Supplier'],
                'budget_owner': i['Budget_owner'],
                'buyer_responsible': i['Buyer_responsible'],
                'award_justification': i['Award_justification'],
            },
            'item_details': [
                {
                    'itemno': i['Item_10_Pr_item'],
                    'stext': i['short_info'],
                    'quantity': i['Item_10_Quantity'],
                    'UOM': i['Item_10_Uom'],
                    'price': i['Item_10_Total_Price'],
                    'plant': i['Item_10_Plant'],
                    'pr': i['Item_10_Pr_number'],
                    'pritem': i['Item_10_Pr_item'],
                },
            ],
            'service_line': [
                {
                    'itemno': i['Service_10_Item_No'],
                    'stext': i['short_info'],
                    'UOM': i['Service_10_Uom'],
                    'quantity': i['Service_10_Quantity'],
                    'unit': i['Service_10_Unit_price'],
                    'net': i['Service_10_Net_price'],
                },
            ],
            'account_assignment': [
                {
                    'itemno': i['Account_10_Item_No'],
                    'gl': i['Account_10_Gl_account'],
                    'cc': i['Account_10_Cost_center'],
                    'fc': i['Account_10_Fund_center'],
                },
            ],
        }
        overall_list.append(po_des)


    pr = pr_details.find({})
  
    for i in pr:
        pr_des = {
            'id': "PR " + str(i['pr_num']),
            'name': i['created_by'],
            'shortText': i['short_info'],
            'priority': i['priority'],
            'Created_on': datetime.strptime(i['creation_date'], '%d.%m.%Y').strftime('%d/%m/%Y'),
            'overall_status': "Ready",
            'levels': [
                {
                    'dept': i['Approver_1_Approval_Level'],
                    'name': i['Approver_1_Approver_Name'],
                    'status': i['Approver_1_Status'],
                },
                {
                    'dept': i['Approver_2_Approval_Level'],
                    'name': i['Approver_2_Approver_Name'],
                    'status': i['Approver_2_Status']
                },
                {
                    'dept': i['Approver_3_Approval_Level'],
                    'name': i['Approver_3_Approver_Name'],
                    'status': i['Approver_3_Status']
                }
            ],
            'details': {
                    'pr_num': i['pr_num'], 
                    'creation_date': datetime.strptime(i['creation_date'], '%d.%m.%Y').strftime('%d/%m/%Y'), 
                    'order_value': i['order_value'], 
                    ' prtype': "Service PR",
                    'created_by': i['created_by'], 
                    'scope_of_work': i['scope_of_work'],
            },
            'item_details': [
                {
                    'itemno': i['Item_10_number'],
                    'stext': i['Item_10_Description'],
                    'quantity': i['Item_10_Quantity'],
                    'UOM': i['Item_10_UOM'],
                    'price': i['Item_10_Total_Price'],
                    'plant': i['Item_10_Plant'],
                },
                {
                    'itemno': i['Item_20_number'],
                    'stext': i['Item_20_Description'],
                    'quantity': i['Item_20_Quantity'],
                    'UOM': i['Item_20_UOM'],
                    'price': i['Item_20_Total_Price'],
                    'plant': i['Item_20_Plant'],
                }
            ],
            'service_line': [
                {
                    'itemno': i['Service_10_Item_No'],
                    'stext': i['Service_10_Short_text'],
                    'quantity': i['Service_10_Quantity'],
                    'UOM': i['Service_10_Uom'],
                    'price': i['Service_10_Unit_price'],
                    'plant': i['Service_10_Net_price'],
                },
                {
                    'itemno': i['Service_20_Item_No'],
                    'stext': i['Service_20_Short_text'],
                    'quantity': i['Service_20_Quantity'],
                    'UOM': i['Service_20_Uom'],
                    'price': i['Service_20_Unit_price'],
                    'plant': i['Service_20_Net_price'],
                },
                {
                    'itemno': i['Service_30_Item_No'],
                    'stext': i['Service_30_Short_text'],
                    'quantity': i['Service_30_Quantity'],
                    'UOM': i['Service_30_Uom'],
                    'price': i['Service_30_Unit_price'],
                    'plant': i['Service_30_Net_price'],
                }
            ],
            'account_assignment': [
                {
                    'itemno': i['Account_10_Item_No'],
                    'gl': i['Account_10_Gl_account'],
                    'cc': i['Account_10_Cost_center'],
                    'fc': i['Account_10_Fund_center'],
                },
                {
                    'itemno': i['Account_20_Item_No'],
                    'gl': i['Account_20_Gl_account'],
                    'cc': i['Account_20_Cost_center'],
                    'fc': i['Account_20_Fund_center'],
                }
            ],
        }
        overall_list.append(pr_des)




    return overall_list




# app.mount("/static_files", StaticFiles(directory="static"), name="static")


if __name__ == '__main__':
    uvicorn.run(app,port=8000, log_level="info")