from fastapi import FastAPI, Depends,  HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import requests
from dotenv import load_dotenv
import os

load_dotenv()
apprun_endpoint = os.getenv("apprun_endpoint")

description = """
  自分のグローバルアドレスを返すAPI
  """

app = FastAPI(
  title = "自分のグローバルアドレスを返すAPI - FastAPI",
  description=description
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
async def startup():

  pass

#終了時
@app.on_event("shutdown")
async def shutdown():
  pass

@app.get("/")
async def root():
  return {"code":"OK!"}

@app.get("/get-pubip")
async def get_pubip():
  return {"code":apprun_endpoint}