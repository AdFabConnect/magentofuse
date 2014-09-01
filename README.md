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
- stof (https://github.com/Incenteev/ParameterHandler)
- mmenozzi https://github.com/webgriffe/magento-installer)
- Vinai (https://github.com/magento-hackathon/magento-composer-installer)

##Grunt
- shama (https://github.com/gruntjs/grunt-contrib-watch)
- tkellen (https://github.com/gruntjs/grunt-contrib-less)
- sindresorhus (https://github.com/gruntjs/grunt-contrib-compass)
- hughsk (https://github.com/hughsk/kss-node)
- indieisaconcept (https://github.com/indieisaconcept/grunt-styleguide)
- shakyShane (https://github.com/shakyShane/grunt-browser-sync)

Much much more to come !


#Usage
## Create a new project
```
composer create-project -s dev adfab/magentofuse new-project
```

**BEWARE : Your Mysql account must have a password**

**BEWARE : In windows, open your command window as administrator (it is mandatory for the symbolic links creation)**

This command will : 
- Ask the Magento version you want to install then download it (be patient, Magento download servers are even slower than composer updates).
- Install the PHPUnit module
- Install the Grunt config
- Enter the installation process : Answer each question including database config.

Once done and only if needed, update your /etc/hosts file + your web server configuration. Relaunch the web server, and you're ready to go !

## Redo the Magento config + database install
If you want to launch specific Magento install, check first that there is no app/etc/local.xml file so that the Magento install can be launched. Then : 
```
composer run-script post-install-cmd
```
This will run the composer post-install script specifically.

## Create a new theme
Once the projet is installed you'll be able to dev the frontend directly from Chrome DevTools while keeping updated ALL browsers (incuding mobiles) connected to your magento website.

[NodeJS](http://nodejs.org/), [Grunt](http://gruntjs.com/) and [Compass](http://compass-style.org/) have to be installed on your computer.

As described in [Magento documentation](http://www.magentocommerce.com/knowledge-base/entry/magentos-theme-hierarchy)

1. Create two subdirectories in app/design/frontend/rwd/custom_theme and skin/frontend/rwd/custom_theme
2. Change watched theme and domain inside Gruntfile.js in the two first variables
3. Log into the Magento admin and change the design theme from default to custom_theme
4. Copy only needed files to override

You now have a responsive base theme ready to be customized.

But it's not over : Magento Fuse brings tools to help front dev.
The Grunt config will give you opportunity to modify your Less / Sass files from Chrome DevTools and automatically compile and synchronize the browsers (IE, FF, Chrome, Safari) even on your mobile.

The Grunt config use grunt-contrib-watch to watch the changes during your dev, grunt-contrib-less, grunt-contrib-compass to compile your Less files and create the map file of your CSS for Chrome to display your Less files in Chrome Devtools (amazing) and grunt-browser-sync to synchronize the CSS, JS and HTML on all your browsers (and no only chrome).

To achieve this, just launch Grunt from your project root :
```
grunt dev
```

Don't forget to script grunt command line when deploying in order to refresh less / sass / css / images

### TDD CSS
This feature is a WiP feature I'm working on : I want to apply the same work process as for back dev : Test Driven Development.

This is now possible to achieve this goal for CSS dev. We'll use the KSS documentation http://warpspire.com/kss/ with the NodeJS KSS-node project and the grunt-styleguide.

During your dev, a live styleguide is created at /styleguide/index.html address (http://yourproject.local/styleguide/index.html).

With the dynamic update on save, you then can work directly on html templates of your doc to create the "unit blocks" of your design.

To benefit from this feature, just launch grunt :
```
grunt dev
```

# HOW-TO DEVELOP A NEW MODULE
## Introduction

With Magento, a module is split into many directories making its development and maintenance difficult.

Thanks to Magento Fuse, we'll fix this and simplify the development of a module : You'll only version your module stuff. Nothing more !

## The skeleton

A new tool fully inspired by Mtool from Daniel Kocherga (https://github.com/dankocherga/MTool) will be added to Magento Fuse soon. In the meantime, organize your module skeleton this way :

```
/app/etc/modules/MyNamespace_MyModule.xml
/app/code/community/MyNamespace/Monmodule/*
/app/design/frontend/base/default/layout/mynamespace/mymodule/*
/app/design/frontend/base/default/template/mynamespace/mymodule/*
/skin/frontend/base/default/css/mynamespace/mymodule/*
/skin/frontend/base/default/js/mynamespace/mymodule/*
/skin/frontend/base/default/images/mynamespace/mymodule/*
/js/mynamespace/mymodule/*
/lib/mynamespace/mymodule/*
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

If you want to reapply your symlinks, just do :

``` ./vendor/bin/composerCommandIntegrator.php magento-module-deploy```
---



### Add this module directory in your IDE

Add the module directory as a project in your IDE (For Eclipse : New->PHP Project from existing directory).

That's it, You can now develop your Magento module with no adherence with the Magento core files :)

Each modification is directly testabe on your Fuse environment. And the versioning will only contain the files from your module.

Enjoy ;)
