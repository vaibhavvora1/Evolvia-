import {
  CLOUDINARY_FOLDER,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_UPLOAD_URL,
} from '../config/cloudinary';

const UPLOAD_TIMEOUT_MS = 60000;

function toSlug(value) {
  const slug = String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  return slug || 'candidate';
}

// Returns { promise, abort }. The promise resolves with { url, publicId, bytes, format }.
export function uploadResume(file, candidateName, onProgress) {
  const xhr = new XMLHttpRequest();

  const promise = new Promise((resolve, reject) => {
    const body = new FormData();
    body.append('file', file);
    body.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    body.append('folder', CLOUDINARY_FOLDER);
    body.append('public_id', `${toSlug(candidateName)}-${Date.now()}`);

    xhr.open('POST', CLOUDINARY_UPLOAD_URL);
    xhr.timeout = UPLOAD_TIMEOUT_MS;

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      let data = null;
      try {
        data = JSON.parse(xhr.responseText);
      } catch {
        data = null;
      }

      if (xhr.status >= 200 && xhr.status < 300 && data?.secure_url) {
        if (onProgress) onProgress(100);
        resolve({
          url: data.secure_url,
          publicId: data.public_id,
          bytes: data.bytes,
          format: data.format,
        });
        return;
      }

      reject(new Error(data?.error?.message || 'The upload was rejected. Please try again.'));
    };

    xhr.onerror = () => reject(new Error('Network error while uploading. Check your connection.'));
    xhr.ontimeout = () => reject(new Error('The upload timed out. Please try again.'));
    xhr.onabort = () => {
      const abortError = new Error('Upload cancelled.');
      abortError.name = 'AbortError';
      reject(abortError);
    };

    xhr.send(body);
  });

  return { promise, abort: () => xhr.abort() };
}