<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && !empty($_POST['action'])) {
    switch ($_POST['action']) {
        case 'loadProjectList':
            loadProjectList();
            break;
        case 'SaveProject':
            saveProject($_POST['project']);
            break;
        case 'SaveProjectByParts':
            saveProjectByParts($_POST['part'], $_POST['index'], isset($_POST['lastChunk']));
            break;
        case 'getIncludedFilesContents':
            getIncludedFilesContents($_POST['files'], $_POST['dir']);
            break;
    }
}


function loadProjectList(){
    $projects_dir = "../projects/";
    $projects     = glob($projects_dir . "*");
    $projectList  = array();
    for ($i = 0; $i < count($projects); $i++) {
        $file = $projects[$i] . '/project.json';
        if (file_exists($file)) {
            $project = file_get_contents($file);
            array_push($projectList, str_replace("../projects/", "", $projects[$i]));
        }
    }
    echo json_encode($projectList);
}


function saveProject($project)
{
    $json_project = base64_decode($project);
    $projectObj = json_decode($json_project, true);

    if (isset($projectObj) && $projectObj != "null") {
        $dir = "../" . $projectObj["dir"];
        if (!file_exists($dir)) {
            mkdir($dir, 0777);
        }
        $files    = scandir($dir);
        $fileWhitelist = array("project.json", "sitemap.xml", "robots.txt");
        $newFiles = array();

        if (isset($projectObj["filesToDelete"])){
            for ($i = 0; $i < count($projectObj["filesToDelete"]); $i++) {
                $targetFile = $dir . $projectObj["filesToDelete"][$i];
                 if (file_exists($targetFile)) {
                   unlink($targetFile);
                 }
            }
            unset($projectObj["filesToDelete"]);
        }


        if (isset($projectObj["pages"])) {
            for ($i = 0; $i < count($projectObj["pages"]); $i++) {

                if (!isset($projectObj["pages"][$i]["html"])) {
                   if (($key = array_search($projectObj["pages"][$i]["path"], $files)) !== false) {
                        unset($files[$key]);
                   }
                    continue;
                }

                if ($projectObj["pages"][$i]["path"] === "index.html"){
                    $htmlPath = $dir . "/" . $projectObj["pages"][$i]["path"];
                    $fileName = $projectObj["pages"][$i]["path"];
                }else{
                    $htmlPath = $dir . "/" . $projectObj["pages"][$i]["path"];
                    $fileName = basename($projectObj["pages"][$i]["path"]);
                }

               if (($key = array_search($fileName, $files)) !== false) {
                    unset($files[$key]);
                }

                $fp = fopen($htmlPath, "wb");
                fwrite($fp, $projectObj["pages"][$i]["html"]);
                fclose($fp);
                unset($projectObj["pages"][$i]["html"]);
            }
        }

        if (!file_exists($dir . "elements")){
            mkdir($dir . "elements", 0777);
        }

        if (isset($projectObj["presets"])) {
            $presetsDir   = $dir . "elements";
            $presetsFiles = scandir($presetsDir);
            $newFiles     = array();
            for ($i = 0; $i < count($projectObj["presets"]); $i++) {
                if (!isset($projectObj["presets"][$i]["html"])) {
                    array_push($newFiles, $projectObj["presets"][$i]["path"]);
                }
            }
            for ($i = 0; $i < count($projectObj["presets"]); $i++) {
                if (isset($projectObj["presets"][$i]["html"])) {
                    $title       = preg_replace("/\s+/", "-", strtolower(preg_replace('/[\?|\||\\|\/|\:|\*|\>|\<|\.|\"|\,]/', "", $projectObj["presets"][$i]["title"])));
                    $title = transliterateString($title);
                    $newFileName = $title . ".html";
                    $j           = 0;
                    if (in_array($newFileName, $newFiles)) {
                        $j = 1;
                        while (in_array($title . "-" . $j . ".html", $newFiles)) {
                            $j++;
                        }
                        $newFileName = $title . "-" . $j . ".html";
                    }
                    array_push($newFiles, $newFileName);
                    $projectObj["presets"][$i]["path"] = $newFileName;
                    $htmlPath                          = $presetsDir . "/" . $newFileName;
                    $fileName                          = $newFileName;
                    if (($key = array_search($fileName, $presetsFiles)) !== false) {
                        unset($presetsFiles[$key]);
                    }
                    if (isset($projectObj["presets"][$i]["html"])) {
                        $fp = fopen($htmlPath, "wb");
                        fwrite($fp, $projectObj["presets"][$i]["html"]);
                        fclose($fp);
                    }

                    if (isset($projectObj["presets"][$i]["preview"]) && !empty($projectObj["presets"][$i]["preview"]) && file_exists($dir . $projectObj["presets"][$i]["preview"])){
                        $ext     = pathinfo($dir . $projectObj["presets"][$i]["preview"]);
                        $preview = basename($dir . $projectObj["presets"][$i]["preview"], "." . $ext['extension']);
                        if (($j == 0 && $preview != $title) || ($j > 0 && $preview != $title . "-" . $j)) {
                            $ext = "." . $ext["extension"];
                            if ($j > 0) {
                                $newPreviewName = $title . "-" . $j;
                            } else {
                                $newPreviewName = $title;
                            }
                            if (file_exists($presetsDir . "/" . $newPreviewName . $ext)) {
                                $k = 1;
                                while (file_exists($presetsDir . "/" . $newPreviewName . "-" . $k . $ext)) {
                                    $k++;
                                }
                                $newPreviewName = $newPreviewName . "-" . $k;
                            }
                            rename($dir . $projectObj["presets"][$i]["preview"], $presetsDir . "/" . $newPreviewName . $ext);
                            $projectObj["presets"][$i]["preview"] = "elements/" . $newPreviewName . $ext;
                        }
                    }
                    unset($projectObj["presets"][$i]["html"]);
                }
            }
            $presetsFiles = scandir($presetsDir);
            foreach ($presetsFiles as $key => $value) {
                if (preg_match("/[^\.]\..*$/", $value)) {
                    if (preg_match('/\.html$/', $value)) {
                        if (!in_array($value, $newFiles)) {
                            $preview = $presetsDir . "/" . basename($value, ".html");
                            if (file_exists($preview . ".jpg")) {
                                unlink($preview . ".jpg");
                            } else if (file_exists($preview . ".png")) {
                                unlink($preview . ".png");
                            }
                            unlink($presetsDir . "/" . $value);
                        }
                    } else {
                        $presetFile = basename($value);
                        $removeFile = true;
                        for ($i = 0; $i < count($projectObj["presets"]); $i++) {
                            $presetPreview = basename($projectObj["presets"][$i]["preview"]);
                            if ($presetPreview == $presetFile) {
                                $removeFile = false;
                                break;
                            }
                        }
                        if ($removeFile) {
                            if (file_exists($presetsDir . "/" . $value)) {
                                unlink($presetsDir . "/" . $value);
                            }
                        }
                    }
                }
            }
        }

        foreach ($files as $key => $value) {
            if (preg_match("/[^\.]\..*$/", $value) && !in_array($value, $fileWhitelist)) {
                unlink($dir . $value);
            }
        }

        if (isset($projectObj["files"])) {
            foreach ($projectObj["files"] as $key => $value) {
                    $fp = fopen($dir . "/" . $key, "wb");
                    fwrite($fp, $value["content"]);
                    fclose($fp);
                unset($projectObj["files"][$key]);
            }
        }


        $file       = $dir . "project.json";
        $projectStr = json_encode($projectObj);

        echo $projectStr;

        $fp         = fopen($file, "wb");
        fwrite($fp, $projectStr);
        fclose($fp);
    }
}


function saveProjectByParts($part, $index, $lastChunk)
{
    if (!$lastChunk) {
        $file = '../temp/save-' . $index . '.txt';
        if (!file_exists("../temp/")) {
            mkdir("../temp/");
        }
        if (file_exists($file)) {
            unlink($file);
        }
        file_put_contents($file, $part);
        echo "success";
    } else {
        $tmpDir      = "../temp/";
        $project = "";
        for ($i = 0; $i < $index; $i++) {
            $file = $tmpDir . "save-" . $i . ".txt";
            if (file_exists($file)) {
                $project .= file_get_contents($file);
                unlink($file);
            }
        }
        $project .= $part;
        saveProject($project);
    }
}


function getIncludedFilesContents($files, $dir){
    $newObj["files"] = json_decode($files, true);
    // Get all files
    foreach ($newObj["files"] as $key => $value) {
        if (strpos($key, $dir) === false) {
            if (file_exists("../" . $dir . $key)) {
                //$newObj["files"][$key] = utf8_encode(file_get_contents("../" . $dir . $key));
                $newObj["files"][$key] = mb_convert_encoding(file_get_contents("../" . $dir . $key), 'UTF-8', 'UTF-8');
            } else {
                $newObj["files"][$key] = "empty";
            }
        } else {
            if (file_exists($key)) {
                $newObj["files"][$key] = file_get_contents($key);
            } else {
                $newObj["files"][$key] = "empty";
            }
        }
    }
    echo json_encode($newObj);
}

function transliterateString($txt) {
   $transliterationTable = array('??' => 'a', '??' => 'A', '??' => 'a', '??' => 'A', '??' => 'a', '??' => 'A', '??' => 'a', '??' => 'A', '??' => 'a', '??' => 'A', '??' => 'a', '??' => 'A', '??' => 'a', '??' => 'A', '??' => 'a', '??' => 'A', '??' => 'ae', '??' => 'AE', '??' => 'ae', '??' => 'AE', '???' => 'b', '???' => 'B', '??' => 'c', '??' => 'C', '??' => 'c', '??' => 'C', '??' => 'c', '??' => 'C', '??' => 'c', '??' => 'C', '??' => 'c', '??' => 'C', '??' => 'd', '??' => 'D', '???' => 'd', '???' => 'D', '??' => 'd', '??' => 'D', '??' => 'dh', '??' => 'Dh', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '???' => 'f', '???' => 'F', '??' => 'f', '??' => 'F', '??' => 'g', '??' => 'G', '??' => 'g', '??' => 'G', '??' => 'g', '??' => 'G', '??' => 'g', '??' => 'G', '??' => 'h', '??' => 'H', '??' => 'h', '??' => 'H', '??' => 'i', '??' => 'I', '??' => 'i', '??' => 'I', '??' => 'i', '??' => 'I', '??' => 'i', '??' => 'I', '??' => 'i', '??' => 'I', '??' => 'i', '??' => 'I', '??' => 'i', '??' => 'I', '??' => 'j', '??' => 'J', '??' => 'k', '??' => 'K', '??' => 'l', '??' => 'L', '??' => 'l', '??' => 'L', '??' => 'l', '??' => 'L', '??' => 'l', '??' => 'L', '???' => 'm', '???' => 'M', '??' => 'n', '??' => 'N', '??' => 'n', '??' => 'N', '??' => 'n', '??' => 'N', '??' => 'n', '??' => 'N', '??' => 'o', '??' => 'O', '??' => 'o', '??' => 'O', '??' => 'o', '??' => 'O', '??' => 'o', '??' => 'O', '??' => 'o', '??' => 'O', '??' => 'oe', '??' => 'OE', '??' => 'o', '??' => 'O', '??' => 'o', '??' => 'O', '??' => 'oe', '??' => 'OE', '???' => 'p', '???' => 'P', '??' => 'r', '??' => 'R', '??' => 'r', '??' => 'R', '??' => 'r', '??' => 'R', '??' => 's', '??' => 'S', '??' => 's', '??' => 'S', '??' => 's', '??' => 'S', '???' => 's', '???' => 'S', '??' => 's', '??' => 'S', '??' => 's', '??' => 'S', '??' => 'SS', '??' => 't', '??' => 'T', '???' => 't', '???' => 'T', '??' => 't', '??' => 'T', '??' => 't', '??' => 'T', '??' => 't', '??' => 'T', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'u', '??' => 'U', '??' => 'ue', '??' => 'UE', '???' => 'w', '???' => 'W', '???' => 'w', '???' => 'W', '??' => 'w', '??' => 'W', '???' => 'w', '???' => 'W', '??' => 'y', '??' => 'Y', '???' => 'y', '???' => 'Y', '??' => 'y', '??' => 'Y', '??' => 'y', '??' => 'Y', '??' => 'z', '??' => 'Z', '??' => 'z', '??' => 'Z', '??' => 'z', '??' => 'Z', '??' => 'th', '??' => 'Th', '??' => 'u', '??' => 'a', '??' => 'a', '??' => 'b', '??' => 'b', '??' => 'v', '??' => 'v', '??' => 'g', '??' => 'g', '??' => 'd', '??' => 'd', '??' => 'e', '??' => 'E', '??' => 'e', '??' => 'E', '??' => 'zh', '??' => 'zh', '??' => 'z', '??' => 'z', '??' => 'i', '??' => 'i', '??' => 'j', '??' => 'j', '??' => 'k', '??' => 'k', '??' => 'l', '??' => 'l', '??' => 'm', '??' => 'm', '??' => 'n', '??' => 'n', '??' => 'o', '??' => 'o', '??' => 'p', '??' => 'p', '??' => 'r', '??' => 'r', '??' => 's', '??' => 's', '??' => 't', '??' => 't', '??' => 'u', '??' => 'u', '??' => 'f', '??' => 'f', '??' => 'h', '??' => 'h', '??' => 'c', '??' => 'c', '??' => 'ch', '??' => 'ch', '??' => 'sh', '??' => 'sh', '??' => 'sch', '??' => 'sch', '??' => '', '??' => '', '??' => 'y', '??' => 'y', '??' => '', '??' => '', '??' => 'e', '??' => 'e', '??' => 'ju', '??' => 'ju', '??' => 'ja', '??' => 'ja');
   return str_replace(array_keys($transliterationTable), array_values($transliterationTable), $txt);
}