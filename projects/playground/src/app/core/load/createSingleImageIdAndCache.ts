import { data } from 'dcmjs';
import { getPTImageIdInstanceMetadata } from './getPTImageIdInstanceMetadata';
import { utilities } from '@cornerstonejs/core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import WADORSHeaderProvider from '../provider/WADORSHeaderProvider';
import getPixelSpacingInformation from './getPixelSpacingInformation';
const { calibratedPixelSpacingMetadataProvider } = utilities;
import { DICOM_SERVER } from '../config/server';
const { DicomMetaDictionary } = data;

export function createSingleImageIdsAndCacheMetaData(
  instanceMetaData: any,
  isWadoRs: boolean = true,
) {
  const metadata = DicomMetaDictionary.naturalizeDataset(instanceMetaData);
  const studyInstanceUID = metadata.StudyInstanceUID;
  const seriesInstanceUID = metadata.SeriesInstanceUID;
  const sopInstanceUID = metadata.SOPInstanceUID;
  const numberOfFrames = metadata.NumberOfFrames;
  const prefix = isWadoRs ? 'wadors:' : 'wadouri:';
  let imageId;
  if (numberOfFrames > 0) {
    imageId =
      prefix +
      DICOM_SERVER +
      '/studies/' +
      studyInstanceUID +
      '/series/' +
      seriesInstanceUID +
      '/instances/' +
      sopInstanceUID +
      '/frames/' +
      Math.round(numberOfFrames / 2);
  } else {
    imageId =
      prefix +
      DICOM_SERVER +
      '/studies/' +
      studyInstanceUID +
      '/series/' +
      seriesInstanceUID +
      '/instances/' +
      sopInstanceUID +
      '/frames/1';
  }

  cornerstoneWADOImageLoader.wadors.metaDataManager.add(
    imageId,
    instanceMetaData,
  );

  WADORSHeaderProvider.addInstance(imageId, instanceMetaData);

  // Add calibrated pixel spacing
  const pixelSpacing = getPixelSpacingInformation(metadata);

  calibratedPixelSpacingMetadataProvider.add(
    imageId,
    pixelSpacing.map((s) => parseFloat(s)),
  );

  return imageId;
}

export function getImageFrameURI(metadataURI, metadata) {
  // Use the BulkDataURI if present int the metadata
  if (metadata['7FE00010'] && metadata['7FE00010'].BulkDataURI) {
    return metadata['7FE00010'].BulkDataURI;
  }

  // fall back to using frame #1
  return metadataURI + '/frames/1';
}
