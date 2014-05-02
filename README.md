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

Here you have adfab/magentofuse, a Magento CE rocketed with the best modules and extensions ever created by fabulous people.

This project aims to ease your life as a Magento dev :
- With Magento Fuse, you install a CE version of Magento in 1 line. The installation includes the database creation and sample upload (if you want).


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

**BEWARE : Your Mysql account must have a password**

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

# HOW-TO DEVELOP A NEW MODULE
## Introduction

With Magento, a module is split into many directories making its development and maintenance difficult.

Thanks to Magento Fuse, we'll fix this and simplify the development of a module : You'll only version your module stuff. Nothing more !

## The skeleton

A new tool fully inspired by Mtool from Daniel Kocherga (https://github.com/dankocherga/MTool) will be added to Magento Fuse soon. In the meantime, organize your module skeleton this way :

```
/app/etc/modules/Adfab_Monmodule.xml
/app/code/community/Adfab/Monmodule/*
/app/design/frontend/base/default/layout/adfab/monmodule/*
/app/design/frontend/base/default/template/adfab/monmodule/*
/skin/frontend/base/default/css/adfab/monmodule/*
/skin/frontend/base/default/js/adfab/monmodule/*
/skin/frontend/base/default/images/adfab/monmodule/*
/js/adfab/monmodule/*
/lib/adfab/monmodule/*
```

## Dev process

### Create the module skeleton
Add a composer.json to define the project as a Magento module ("type" : "magento-module") + describe the installation mapping :

```

{
    "name": "adfab/avatar",
    "description": "Social commerce is on its way",
    "version": "1.0.0",
    "type": "magento-module",
    "keywords": [
        "magento", "avatar", "social commerce", "adfab"
    ],
    "homepage": "http://www.adfab.fr",
    "license":"OSL-3.0",
    "authors": [
        {
            "name": "Grégory Besson",
            "email": "gregory.besson@adfab.fr",
            "homepage": "http://www.adfab.fr"
        }
    ],
    "require": {
        "magento-hackathon/magento-composer-installer": "@stable"
    },
    "extra": {
        "map": [
            ["app/etc/modules/Adfab_Avatar.xml", "app/etc/modules/Adfab_Avatar.xml"],
            ["app/code/community/Adfab/Avatar/", "app/code/community/Adfab/Avatar/"],
            ["app/design/frontend/base/default/layout/adfab/avatar/layout.xml", "app/design/frontend/base/default/layout/adfab/avatar/layout.xml"],
            ["app/locale/en_US/Adfab_Avatar.csv", "app/locale/en_US/Adfab_Avatar.csv"],
            ["app/locale/fr_FR/Adfab_Avatar.csv", "app/locale/fr_FR/Adfab_Avatar.csv"],
            ["skin/frontend/base/default/css/adfab/avatar/", "skin/frontend/base/default/css/adfab/avatar/"],
            ["skin/frontend/base/default/images/adfab/avatar/", "skin/frontend/base/default/images/adfab/avatar/"],
            ["skin/frontend/base/default/js/adfab/", "skin/frontend/base/default/js/adfab/"]
        ]
    }
}
```

### Version this module 
Use Git or SVN as you wish



### Install a Magento version with Magento Fuse
Once done, declare the SVN or Git repository in the Fuse composer.json (following example for SVN) :

```
"require": {
    "adfab/avatar": "dev-trunk"
},
"repositories": [
    {
        "type": "vcs",
        "url": "http://myrepository.com/svn/MAGENTO/AVATAR"
    }
],
```

Launch ``` composer update ``` (your module will be installed in your vendor directory)

---

**BE CAREFUL**

Don't forget to activate the symlinks in System/configuration/Developer/Allow Symlinks

If you forget to do that, the render of your templates will fail silently :P

---

### Add this module directory in your IDE

Add the module directory as a project in your IDE (For Eclipse : New->PHP Project from existing directory).

That's it, You can now develop your Magento module with no adherence with the Magento core files :)

Each modification is directly testabe on your Fuse environment. And the versioning will only contain the files from your module.

Enjoy ;)
