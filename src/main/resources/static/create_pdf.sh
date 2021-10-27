#!/bin/bash

function print_usage() {
    echo "Usage : ${0} [URL] [PARAMS] [PDF_DIR] [FILE_NAME]"
}

if [ $# == 0 ] ; then
  print_usage;
  exit;
fi

URL=$1;
PARAMS=$2;
PDF_DIR=$3;
FILE_NAME=$4;
COMMAND=${URL}${PARAMS}

if [ "$1" == "test" ]; then
  COMMAND=http://vaiv.kr
  echo "url 없음... ${COMMAND}로 실행"
fi


echo "URL: ${URL}, PARAMS: ${PARAMS}, PDF_DIR: ${PDF_DIR}, FILE_NAME: ${FILE_NAME}"
echo "node ${PDF_DIR}/html2pdf.js ${COMMAND} ${PDF_DIR}/output/${FILE_NAME}"
node ${PDF_DIR}/html2pdf.js ${COMMAND} ${PDF_DIR}/output/${FILE_NAME}
