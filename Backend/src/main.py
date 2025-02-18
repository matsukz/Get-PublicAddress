from fastapi import FastAPI, Depends,  HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import requests
from dotenv import load_dotenv
import os

load_dotenv()
apprun_endpoint = os.getenv("apprun_endpoint")

nginx_pass = "/rmip/api"

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

@app.get(f"{nginx_pass}/get-pubip")
async def get_pubip():
  pub_ip_result = requests.get(apprun_endpoint)
  if pub_ip_result.status_code == 200:
    return pub_ip_result.json()
  else:
    raise HTTPException(status_code=pub_ip_result.status_code, detail="Server Error!")
  
@app.get("/rmip/api/cf/getIP")
async def get_cf_getIP():
  pub_ip_result = requests.get("https://hono-return-httpheader.ma2kz-project.workers.dev/headers/api/scrip")
  if pub_ip_result.status_code == 200:
    return pub_ip_result.json()
  else:
    raise HTTPException(status_code=pub_ip_result.status_code, detail="Server Error!")