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

Here you have adfab/magento, a Magento CE rocketed with the best modules and extensions ever created by fabulous people

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
```
composer create-project adfab/magento new-project 1.8.1.0-dev
```
To know which versions of Magento are available check available branches.

If you want to launch specific Magento install : 
```
composer run-script post-install-cmd
```
Many thanks to https://github.com/webgriffe/magento !

Once the projet is installed you'll be able to dev the frontend directly from Chrome DevTools while keeping updated ALL browsers (incuding mobiles)
connected to your magento website.

(You have to have NodeJS and Grunt installed on your machine).
To launch Grunt, from your project root :
```
sudo grunt
```

That's all
