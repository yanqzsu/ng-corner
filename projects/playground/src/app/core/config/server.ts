import ViewportType from '@cornerstonejs/core/dist/esm/enums/ViewportType';
import { ImageInfo } from './type';

// export const DICOM_SERVER: string = 'http://10.81.22.40:38081/dicom-web';
export const DICOM_SERVER: string = 'http://localhost:8080/dicom-web';

const imageInfoRemote = {
  studyInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
  seriesInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
  wadoRsRoot: 'https://d1qmxk7r72ysft.cloudfront.net/dicomweb',
  viewportType: ViewportType.ORTHOGRAPHIC,
  volumeId: 'imageInfoRemote',
};

const imageInfoStack: ImageInfo = {
  studyInstanceUID: '1.2.840.113619.2.207.3596.11798570.20933.1191218624.826',
  seriesInstanceUID: '1.2.840.113619.2.207.3596.11798570.20933.1191218624.828',
  wadoRsRoot: 'http://10.81.20.156:8080/dicom-web',
  viewportType: ViewportType.STACK,
  volumeId: 'imageInfoStack',
};

const imageInfoVolume: ImageInfo = {
  studyInstanceUID: '1.2.840.113711.7041813.2.3212.182276852.26.2116281012.16720',
  seriesInstanceUID: '1.3.12.2.1107.5.2.6.14114.30000006101211003631200000970',
  wadoRsRoot: 'http://10.81.20.156:8080/dicom-web',
  viewportType: ViewportType.ORTHOGRAPHIC,
  volumeId: 'imageInfoVolume',
};

const imageInfoVolume2: ImageInfo = {
  studyInstanceUID: '1.2.392.200055.5.4.80861305518.20150928153455671288',
  seriesInstanceUID: '1.2.392.200036.9142.10002202.1020869001.2.20150928174647.30151',
  wadoRsRoot: 'http://10.81.20.156:8080/dicom-web',
  viewportType: ViewportType.ORTHOGRAPHIC,
  volumeId: 'imageInfoVolume2',
};
