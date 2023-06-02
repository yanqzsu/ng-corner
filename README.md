# NgCornerstone

This library is an angular project for [CornerStone3D](https://www.cornerstonejs.org/)
It can be used as a viewport of DICOM images.


## Prepare
For Npm Run
> npm install @cornerstonejs/core  
> npm install @cornerstonejs/tools  
> npm install @cornerstonejs/streaming-image-volume-loader   
> npm install @cornerstonejs/dicom-image-loader

Or Yarn
> yarn add @cornerstonejs/core  
> yarn add @cornerstonejs/tools  
> yarn add @cornerstonejs/streaming-image-volume-loader  
> yarn add @cornerstonejs/dicom-image-loader

## Install
Run `ng add ng-cornerstone`

## Import Assets
Edit `angular.json`
```
...
"architect": {
  "build": {
      ...
      "assets": [
        ...
        {
          "glob": "**/*",
          "input": "./dist/ng-cornerstone/src/assets",
          "output": "/assets/"
        }
...
```

## Usage
```ts
imports: [ViewportModule]
```
```html
<nc-viewport
  [toolList]="toolList"
  [imageInfo]="imageInfo"
></nc-viewport>
```
ToolList support follow tools:  
AngleTool,
ArrowAnnotateTool,
EllipticalROITool,
LengthTool,
PanTool,
RectangleROITool,
StackScrollTool,
TrackballRotateTool,
WindowLevelTool,
ZoomTool, FlipV, FlipH,
Rotate, Next, Previous, Coronal, Axial, Sagittal


ImageInfo should provide studyInstanceUID, seriesInstanceUID, urlRoot, viewportType, schema
like:
```
{
  studyInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
  seriesInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
  urlRoot: 'https://d1qmxk7r72ysft.cloudfront.net/dicomweb',
  viewportType: ViewportType.ORTHOGRAPHIC,
  schema: RequestSchema.WadoRs,
  volumeLoaderScheme: VolumeLoaderSchema.stream,
}
```
## Code structure

1. ng-cornerstone is the library.
2. ncv-example is an example app of ng-cornerstone
3. ng-playground is an angular app depends on @cornerstonejs directly.


## Optional: Enable WASM
To enable dynamic-import cornerstoneWADOImageLoader, you can use `@angular-builders/custom-webpack`.
The angular json should like:
```
"architect": {
  "build": {
    "builder": "@angular-builders/custom-webpack:browser",
    "options": {
      "customWebpackConfig": {
        "path": "./extra-webpack.config.js",
        "mergeRules": {
          "externals": "replace"
        }
      },
      "assets": [
        ...
        {
        "glob": "**/*",
        "input": "./node_modules/@cornerstonejs/dicom-image-loader/dist/dynamic-import",
        "output": "/"
        }
      ]
    }
  }
}
```
extra-webpack.config.js should like:
```js
module.exports = {
  resolve: {
    // We use this alias and the CopyPlugin below to support using the dynamic-import version
    // of WADO Image Loader, but only when building a PWA. When we build a package, we must use the
    // bundled version of WADO Image Loader so we can produce a single file for the viewer.
    // (Note: script-tag version of the viewer will no longer be supported in OHIF v3)
    alias: {
      '@cornerstonejs/dicom-image-loader':
        '@cornerstonejs/dicom-image-loader/dist/dynamic-import/cornerstoneDICOMImageLoader.min.js',
    },
  },
}
```

For more detail, refer to [here](https://github.com/cornerstonejs/cornerstoneWADOImageLoader#upgrade-to-cwil-v4x)


## Enable SharedBufferArray
Edit `angular.json` add two headers:
```
...
"serve": {
  ...
  "options": {
    "host": "0.0.0.0",
    "headers": {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin"
    },
    ...
  },
...

```
You should also add the two header when deploy your app as a product.


## Troubleshooting
If ng serve failed, try to edit tsconfig.json
```json
{
    "compilerOptions": {
        "skipLibCheck": true
    }
}
```
