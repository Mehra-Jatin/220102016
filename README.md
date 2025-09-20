
## Installation 
```bash
git clone https://github.com/Mehra-Jatin/220102016
```
 # Configure environment variables:

Copy the .env.sample file to .env

``` bash
cd LoggingMiddleware
npm install
```
``` bash
cd ../backend
npm install
npm run build
npm run start

```
##Create Short URL (POST)
``` bash
POST /shorturls
 ```
Example
http://localhost:5000/shorturls 

<img width="1712" height="598" alt="Screenshot 2025-09-20 123013" src="https://github.com/user-attachments/assets/1502d54e-baf1-4e9a-837c-bb8a0aa967f8" />

##Get Original URL (GET)
```bash
GET /shorturls/code
```
Example
http://localhost:5000/shorturls/xyz  
<img width="1762" height="671" alt="image" src="https://github.com/user-attachments/assets/cb13d255-b7ae-4c5a-a48a-7edf8da34fb3" />
