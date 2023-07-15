echo "Jump to app folder"
cd /home/ubuntu/xana-web-next

echo "Update app from Git"
git checkout testnet
git pull origin testnet

echo "Install app dependencies"
npm install

echo "Build your app"
npm run dev:build

echo "Run new PM2 action"
pm2 restart 0
