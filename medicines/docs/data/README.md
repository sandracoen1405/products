# Data

Details are included here of how the data that powers the products site is stored and updated.

## Overview

The main data used by the products site relates predominantly to 3 types of document:
SPCs
PILs
PARs

## Storage

All SPC, PIL and PAR files are stored as blobs in an Azure blob container along with associated metadata fields, including:

- Substance name - e.g. "CLOPIDOGREL BESILATE"
- Doc type - e.g. “SPC”
- Facets - key words, e.g. “CLOPIDOGREL BESILATE”
- Product name - e.g. “CADIX 75MG FILM-COATED TABLETS”
- File name - original name of the file, e.g. “CON1552021698726”
- PL number - e.g. "PL403780095"
- Title - title of the document, e.g. “spc-doc_PL 40378-0095”
- Date created - upload date of document, e.g. “2019-03-08T05:08:00+00:00”
- Release state - whether the document is released, e.g. “Y”
- Revision label - version number of the file, e.g. “2”
  This index is defined in code here: https://github.com/MHRA/products/blob/master/medicines/search/src/index.rs

Each file is stored as a blob with a name that is a hash of the file contents, e.g. “000f6ec9a52b3230d5f880e55fb33a405a1c83d3”.

## Updates

SPC and PIL files are updated on a weekly basis, as the result of the batch process run on the Sentinel server.

PAR files are updated on a weekly basis, as the result of a manual upload process to Sharepoint. New PAR files are uploaded and a spreadsheet is updated with a new line, containing the associated metadata.

The importer within this repository processes these files and metadata, matching the file name with the “file name” field in the metadata row and then attaching the metadata to each file, before uploading it to the Azure blob storage.

## Search

Each file is discoverable through the search functionality of the products site. In order to achieve this, the Azure search service is used. There are three main parts to this service:
Index - like a table, this has defined fields and stores a big list of entries for everything that is searchable through the service. Search results are returned from here
Indexer - this runs periodically and fills the index with searchable entries
Data source - this is used by the indexer to define a searchable source of data. In the case of the products site, this is the Azure blob container that holds all of the files.

Every time the contents of the blob container are updated, the indexer must run over the container again in order for these changes to be reflected in the search index.

## Retention

Files will be retained and stored in the blob container indefinitely, until either replaced or deleted by the automatic batch process.

## Security

Read-only access to the individual blob files is available to anyone who has the file’s URI, which is surfaced through the search service.

The ability to update files is restricted, only open to those with privileged access to the Azure account. Similarly, any updates to the index can only be carried out by authorised users.

## Data sensitivity

Performance/scalability
Availability/resilience
