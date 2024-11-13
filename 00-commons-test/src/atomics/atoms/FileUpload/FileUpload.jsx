/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [13/09/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import React from 'react';
import PropTypes from 'prop-types';
import { DocumentUploadCard } from '@lp_front_account/lp-kit-dashboards/';
import Utils from '../../../utils/utils.js';

const FileUpload = ({ id, fileName, loading, description, fileNameLength, loadingMessage, cardType, onRemove }) => {

  return (
    <DocumentUploadCard
      id={id ? id : (Utils.getUUID())}
      fileName={fileName}
      description={description}
      loading={loading}
      fileNameLength={fileNameLength ? fileNameLength : 20}
      loadingMessage={loadingMessage}
      cardType={cardType ? cardType : 'default'}
      onRemove={onRemove ? onRemove : () => { }}
    />
  );
};

FileUpload.propTypes = {
  /** to identify the card */
  id: PropTypes.string,
  /** to display the name in the card */
  fileName: PropTypes.string,
  /** to display below the loading bar */
  description: PropTypes.string,
  /** to show a loading bar or a complete loading bar */
  loading: PropTypes.bool.isRequired,
  /** to get all properties of the card */
  onRemove: PropTypes.func.isRequired,
  /** to limit the number of characters int he file name to avoid overlapping */
  fileNameLength: PropTypes.number,
  /** to show message description loading bar */
  loadingMessage: PropTypes.string,
  /** to get type card for desing */
  cardType: PropTypes.oneOf(['error', 'default']).isRequired
}

export default FileUpload;