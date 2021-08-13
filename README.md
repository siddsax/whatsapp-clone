# whatsapp-clone

Steps 

```bash
sudo npm install --global yarn # Install Yarn
yarn install # Install all the reqs from the package.json
sudo npm install -g @aws-amplify/cli # Install aws amplify
```

Now we need to configure AWS IAM user related settings

```bash 
amplify configure # configure as per your account
npm install aws-amplify aws-amplify-react-native @react-native-community/netinfo @react-native-async-storage/async-storage # install other dependencies
amplify pull --appId d3ay1dxl3h3weo --envName dev # pull amplify files from project
mv src/aws-exports.js .
```

Need to set-up google services too for notification by downloading the file from the firebase console.


