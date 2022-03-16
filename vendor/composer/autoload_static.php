<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInita59e79b0fc58f0dece495b18dbcf2abc
{
    public static $prefixesPsr0 = array (
        'x' => 
        array (
            'xrstf\\Composer52' => 
            array (
                0 => __DIR__ . '/..' . '/xrstf/composer-php52/lib',
            ),
        ),
        't' => 
        array (
            'tad_DI52_' => 
            array (
                0 => __DIR__ . '/..' . '/lucatume/di52/src',
            ),
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixesPsr0 = ComposerStaticInita59e79b0fc58f0dece495b18dbcf2abc::$prefixesPsr0;
            $loader->classMap = ComposerStaticInita59e79b0fc58f0dece495b18dbcf2abc::$classMap;

        }, null, ClassLoader::class);
    }
}