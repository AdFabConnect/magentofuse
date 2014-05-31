<?php
namespace Adfab;

use Composer\Script\Event;
use Composer\IO\IOInterface;

class MagentoDownloader {
    
    public static $regEx = '^1\.\d+\.\d+.*';
    protected $url = 'http://www.magentocommerce.com/downloads/assets/${VERSION}/magento-${VERSION}.tar.gz';
    protected $version;
    protected $filename;
    protected $rootDir;
    /**
     * @var IOInterface
     */
    protected $io;
    
    public function __construct( $version = null, IOInterface $io = null) {
        if ( $io ) {
            $version = $io->askAndValidate('Magento version: ', array($this,'validateVersion'), 3);
        }
        self::validateVersion($version);
        $this->version = $version;
        $this->rootDir = dirname(dirname(__DIR__));
        $this->filename = $this->rootDir.'/var/magento.tar.gz';
        $this->io = $io;
    }
    
    public function progress($download_size, $downloaded, $upload_size, $uploaded)
    {
        if($download_size > 0 && $this->io ) {
            $this->io->write('Download magento source file: '.round( $downloaded / $download_size  * 100, 2). '%'."\r", false);
        }
    }
    
    public function download() {
        $out = fopen($this->filename,'wb');
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_FILE, $out);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_URL, strtr($this->url,array('${VERSION}'=>$this->version)));
        curl_setopt($ch, CURLOPT_PROGRESSFUNCTION, array($this,'progress'));
        curl_setopt($ch, CURLOPT_NOPROGRESS, false);
        curl_exec($ch);
        curl_close($ch);
        fclose($out);
    }
    
    public function extract() {
        $varDir = $this->rootDir.DIRECTORY_SEPARATOR.'var';
        $tarFile = $varDir.DIRECTORY_SEPARATOR.'magento.tar';

        if ( file_exists($tarFile) ) {
			unlink($tarFile);
        }
		
        $phar = new \PharData($this->filename);
        $phar->decompress();
        $phar = new \PharData($tarFile);
        $phar->extractTo($varDir,null, true);
    }

    public function sync($dir = '') {
        foreach( glob($this->rootDir.'/var/magento'.$dir.'/{,.}*', GLOB_BRACE) as $subDir ) {
            $baseName = pathinfo($subDir,PATHINFO_BASENAME);
            if ( !in_array( $baseName, array('.','..') ) ) {
                if ( is_dir($this->rootDir.$dir.'/'.$baseName) ) {
                    $this->sync($dir.'/'.$baseName);
                    rmdir($this->rootDir.'/var/magento'.$dir.'/'.$baseName);
                }
                else {
                    rename($subDir, $this->rootDir.$dir.'/'.$baseName);
                }
            }
        }
        
		$tarFile = $this->rootDir.DIRECTORY_SEPARATOR.'var'.DIRECTORY_SEPARATOR.'magento.tar';

		// We delete the uncompressed magento.tar file
        if ( file_exists($tarFile) ) {
			unlink($tarFile);
        }

    }
    
    public static function validateVersion($version) {
        if ( preg_match('/'.self::$regEx.'/ims', $version) ) {
            return $version;
        }
        else {
            throw new \Exception('Invalid Magento version format (1.x.x...)');
        }
    }
    
    public static function run(Event $event) {
        $magentoDownloader = new self(null, $event->getIO());
        $magentoDownloader->download();
        $magentoDownloader->extract();
        $magentoDownloader->sync();
    }
}
