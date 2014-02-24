Magento FUSE
============

Magento Management Driven by Composer & Grunt

This project is directly inspired by http://en.wikipedia.org/wiki/AppFuse

- I wanted Magento
- I wanted Magento to be fast
- I wanted Magento to be fast and easy to install
- I wanted Magento to be fast and easy to unit test
- I wanted Magento to be fast and easy to extend 
- I wanted Magento to be fast and easy to skin
- I wanted Magento to be fast and easy to embed new features

Here you have adfab/magento, a Magento CE rocketed with the best modules and extensions ever created by fabulous people.

This project aims to ease your life as a Magento dev :
- With Magento Fuse, you install a CE version of Magento in 1 line. The installation includes the database creation and sample upload (if you want).

For the version 1.8.1.0, here is what has been modified in the core (yes : core !) of Magento :
- Fix of the bug on some architectures : http://stackoverflow.com/questions/16800147/how-to-solve-php-extensions-0-must-be-loaded
- the .htaccess file has been modified so that you can work in dev mode on your local env with this :

```
############################################
## Dev Environment if host = *.local or *.dev
## TODO: ini_set('display_errors', 1);
## 

    SetEnvIf Host .*\.dev MAGE_IS_DEVELOPER_MODE=1
    SetEnvIf Host .*\.local MAGE_IS_DEVELOPER_MODE=1
```


##Composer
- ivanchepurnyi (https://github.com/EcomDev/EcomDev_PHPUnit)
- bencorlett (https://github.com/webcomm/magento-boilerplate)
- stof (https://github.com/Incenteev/ParameterHandler)
- mmenozzi https://github.com/webgriffe/magento-installer)
- Vinai (https://github.com/magento-hackathon/magento-composer-installer)

##Grunt
- shama (https://github.com/gruntjs/grunt-contrib-watch)
- tkellen (https://github.com/gruntjs/grunt-contrib-less)
- hughsk (https://github.com/hughsk/kss-node)
- indieisaconcept (https://github.com/indieisaconcept/grunt-styleguide)
- shakyShane (https://github.com/shakyShane/grunt-browser-sync)

Much much more to come !


#Usage
## Create a new project
```
composer create-project adfab/magentofuse new-project 1.8.1.0-dev
```
(Check available branches to know which versions of Magento are available)

This command will : 
- download the Magento version 1.8.1.0
- Install the PHPUnit module
- Install the Magento Bootstrap 3 boilerplate
- Install the Grunt config
- Enter the installation process : Answer each question including database config.

Once done, update your /etc/hosts file + your web server configuration. Relaunch the web server, and you're ready to go !

## Redo the Magento config + database install
If you want to launch specific Magento install, check first that there is no app/etc/local.xml file so that the Magento install can be launched. Then : 
```
composer run-script post-install-cmd
```
This will run the composer post-install script specifically.

## Create a new theme
Once the projet is installed you'll be able to dev the frontend directly from Chrome DevTools while keeping updated ALL browsers (incuding mobiles) connected to your magento website.

You have to have NodeJS and Grunt installed on your machine.

1. Copy / paste the ready to develop skin theme from var/vendor/webcomm/magento-boilerplate/skin/frontend/mytheme to skin/frontend/youtheme
2. Copy / paste the ready to develop design theme from var/vendor/webcomm/magento-boilerplate/app/design/frontend/boilerplate to app/design/frontend/yourtheme
3. Log in to the Magento Admin and change the design package from default to yourtheme

You now have a Bootstrap responsive base theme ready to be themed.

But it's not over : Magento Fuse brings tools to help front dev.
The Grunt config will give you opportunity to modify your Less files from Chrome DevTools and automatically compile and synchronize the browsers (IE, FF, Chrome, Safari) even on your mobile.

The Grunt config use grunt-contrib-watch to watch the changes during your dev, grunt-contrib-less to compile your Less files and create the map file of your CSS for Chrome to display your Less files in Chrome Devtools (amazing) and grunt-browser-sync to synchronize the CSS, JS and HTML on all your browsers (and no only chrome).

To achieve this, just launch Grunt from your project root :
```
sudo grunt
```

### TDD CSS
This feature is a WiP feature I'm working on : I want to apply the same work process as for back dev : Test Driven Development.

This is now possible to achieve this goal for CSS dev. We'll use the KSS documentation http://warpspire.com/kss/ with the NodeJS KSS-node project and the grunt-styleguide.

During your dev, a live styleguide is created at /styleguide/index.html address (http://yourproject.local/styleguide/index.html).

With the dynamic update on save, you then can work directly on html templates of your doc to create the "unit blocks" of your design.

To benefit from this feature, just launch grunt :
```
sudo grunt
```


Enjoy ;)
