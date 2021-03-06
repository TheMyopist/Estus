<?php
/**
 * Upload
 *
 * @author      Josh Lockhart <info@joshlockhart.com>
 * @copyright   2012 Josh Lockhart
 * @link        http://www.joshlockhart.com
 * @version     2.0.0
 *
 * MIT LICENSE
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
namespace Upload;

/**
 * File Information
 *
 * @author  Josh Lockhart <info@joshlockhart.com>
 * @since   2.0.0
 * @package Upload
 */
class FileInfo extends \SplFileInfo implements \Upload\FileInfoInterface
{
    /**
     * Factory method that returns new instance of \FileInfoInterface
     * @var callable
     */
    protected static $factory;

    /**
     * File name (without extension)
     * @var string
     */
    protected $name;

    /**
     * File extension (without dot prefix)
     * @var string
     */
    protected $extension;

    /**
     * File mimetype
     * @var string
     */
    protected $mimetype;

    /**
     * Constructor
     *
     * @param string $filePathname Absolute path to uploaded file on disk
     * @param string $newName      Desired file name (with extension) of uploaded file
     */
    public function __construct($filePathname, $newName = null)
    {
        $desiredName = is_null($newName) ? $filePathname : $newName;
        $this->setName(pathinfo($desiredName, PATHINFO_FILENAME));
        $this->setExtension(pathinfo($desiredName, PATHINFO_EXTENSION));

        parent::__construct($filePathname);
    }

    /**
     * Get file name (without extension)
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set file name (without extension)
     * 
     * It also makes sure file name is safe
     *
     * @param  string           $name
     * @return \Upload\FileInfo Self
     */
    public function setName($name)
    {
        $name = $this->transliterateString($name);
        $name = mb_convert_case($name, MB_CASE_LOWER, "UTF-8");
        $name = preg_replace("/([^\w\s\d\-_~,;:\[\]\(\).]|[\.]{2,})/", "", $name);
        $name = preg_replace("/\s+/", "-", $name);
        $name = basename($name);
        $this->name = $name;

        return $this;
    }

    /**
     * Get file extension (without dot prefix)
     *
     * @return string
     */
    public function getExtension()
    {
        return $this->extension;
    }

    /**
     * Set file extension (without dot prefix)
     *
     * @param  string           $extension
     * @return \Upload\FileInfo Self
     */
    public function setExtension($extension)
    {
        $this->extension = strtolower($extension);

        return $this;
    }

    /**
     * Get file name with extension
     *
     * @return string
     */
    public function getNameWithExtension()
    {
        return $this->extension === '' ? $this->name : sprintf('%s.%s', $this->name, $this->extension);
    }

    /**
     * Get mimetype
     *
     * @return string
     */
    public function getMimetype()
    {
        if (isset($this->mimetype) === false) {
            $finfo = new \finfo(FILEINFO_MIME);
            $mimetype = $finfo->file($this->getPathname());
            $mimetypeParts = preg_split('/\s*[;,]\s*/', $mimetype);
            $this->mimetype = strtolower($mimetypeParts[0]);
            unset($finfo);
        }

        return $this->mimetype;
    }

    /**
     * Get md5
     *
     * @return string
     */
    public function getMd5()
    {
        return md5_file($this->getPathname());
    }

    /**
     * Get a specified hash
     *
     * @return string
     */
    public function getHash($algorithm = 'md5')
    {
        return hash_file($algorithm, $this->getPathname());
    }

    /**
     * Get image dimensions
     *
     * @return array formatted array of dimensions
     */
    public function getDimensions()
    {
        list($width, $height) = getimagesize($this->getPathname());

        return array(
            'width' => $width,
            'height' => $height
        );
    }

    /**
     * Is this file uploaded with a POST request?
     *
     * This is a separate method so that it can be stubbed in unit tests to avoid
     * the hard dependency on the `is_uploaded_file` function.
     *
     * @return bool
     */
    public function isUploadedFile()
    {
        return is_uploaded_file($this->getPathname());
    }

    public static function setFactory($callable)
    {
        if (is_object($callable) === false || method_exists($callable, '__invoke') === false) {
            throw new \InvalidArgumentException('Callback is not a Closure or invokable object.');
        }

        static::$factory = $callable;
    }

    public static function createFromFactory($tmpName, $name = null) {
        if (isset(static::$factory) === true) {
            $result = call_user_func_array(static::$factory, array($tmpName, $name));
            if ($result instanceof \Upload\FileInfoInterface === false) {
                throw new \RuntimeException('FileInfo factory must return instance of \Upload\FileInfoInterface.');
            }

            return $result;
        }

        return new static($tmpName, $name);
    }

    protected function transliterateString($txt) {
       $transliterationTable = array('??' => 'a', '??' => 'A', '??' => 'a', '??' => 'A', '??' => 'a', '??' => 'A', '??' => 'a', '??' => 'A', '??' => 'a', '??' => 'A', '??' => 'a', '??' => 'A', '??' => 'a', '??' => 'A', '??' => 'a', '??' => 'A', '??' => 'ae', '??' => 'AE', '??' => 'ae', '??' => 'AE', '???' => 'b', '???' => 'B', '??' => 'c', '??' => 'C', '??' => 'c', '??' => 'C', '??' => 'c', '??' => 'C', '??' => 'c', '??' => 'C', '??' => 'c', '??' => 'C', '??' => 'd', '??' => 'D', '???' => 'd', '???' => 'D', '??' => 'd', '??' => 'D', '??' => 'dh', '??' => 'Dh', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '???' => 'f', '???' => 'F', '??' => 'f', '??' => 'F', '??' => 'g', '??' => 'G', '??' => 'g', '??' => 'G', '??' => 'g', '??' => 'G', '??' => 'g', '??' => 'G', '??' => 'h', '??' => 'H', '??' => 'h', '??' => 'H', '??' => 'i', '??' => 'I', '??' => 'i', '??' => 'I', '??' => 'i', '??' => 'I', '??' => 'i', '??' => 'I', '??' => 'i', '??' => 'I', '??' => 'i', '??' => 'I', '??' => 'i', '??' => 'I', '??' => 'j', '??' => 'J', '??' => 'k', '??' => 'K', '??' => 'l', '??' => 'L', '??' => 'l', '??' => 'L', '??' => 'l', '??' => 'L', '??' => 'l', '??' => 'L', '???' => 'm', '???' => 'M', '??' => 'n', '??' => 'N', '??' => 'n', '??' => 'N', '??' => 'n', '??' => 'N', '??' => 'n', '??' => 'N', '??' => 'o', '??' => 'O', '??' => 'o', '??' => 'O', '??' => 'o', '??' => 'O', '??' => 'o', '??' => 'O', '??' => 'o', '??' => 'O', '??' => 'oe', '??' => 'OE', '??' => 'o', '??' => 'O', '??' => 'o', '??' => 'O', '??' => 'oe', '??' => 'OE', '???' => 'p', '???' => 'P', '??' => 'r', '??' => 'R', '??' => 'r', '??' => 'R', '??' => 'r', '??' => 'R', '??' => 's', '??' => 'S', '??' => 's', '??' => 'S', '??' => 's', '??' => 'S', '???' => 's', '???' => 'S', '??' => 's', '??' => 'S', '??' => 's', '??' => 'S', '??' => 'SS', '??' => 't', '??' => 'T', '???' => 't', '???' => 'T', '??' => 't', '??' => 'T', '??' => 't', '??' => 'T', '??' => 't', '??' => 'T', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'ue', '??' => 'UE', '???' => 'w', '???' => 'W', '???' => 'w', '???' => 'W', '??' => 'w', '??' => 'W', '???' => 'w', '???' => 'W', '??' => 'y', '??' => 'Y', '???' => 'y', '???' => 'Y', '??' => 'y', '??' => 'Y', '??' => 'y', '??' => 'Y', '??' => 'z', '??' => 'Z', '??' => 'z', '??' => 'Z', '??' => 'z', '??' => 'Z', '??' => 'th', '??' => 'Th', '??' => 'u', '??' => 'a', '??' => 'a', '??' => 'b', '??' => 'b', '??' => 'v', '??' => 'v', '??' => 'g', '??' => 'g', '??' => 'd', '??' => 'd', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'zh', '??' => 'zh', '??' => 'z', '??' => 'z', '??' => 'i', '??' => 'i', '??' => 'j', '??' => 'j', '??' => 'k', '??' => 'k', '??' => 'l', '??' => 'l', '??' => 'm', '??' => 'm', '??' => 'n', '??' => 'n', '??' => 'o', '??' => 'o', '??' => 'p', '??' => 'p', '??' => 'r', '??' => 'r', '??' => 's', '??' => 's', '??' => 't', '??' => 't', '??' => 'u', '??' => 'u', '??' => 'f', '??' => 'f', '??' => 'h', '??' => 'h', '??' => 'c', '??' => 'c', '??' => 'ch', '??' => 'ch', '??' => 'sh', '??' => 'sh', '??' => 'sch', '??' => 'sch', '??' => '', '??' => '', '??' => 'y', '??' => 'y', '??' => '', '??' => '', '??' => 'e', '??' => 'e', '??' => 'ju', '??' => 'ju', '??' => 'ja', '??' => 'ja');
       return str_replace(array_keys($transliterationTable), array_values($transliterationTable), $txt);
    }
}
