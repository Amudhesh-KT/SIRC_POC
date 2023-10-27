from fastapi import FastAPI

from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request,Response



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


