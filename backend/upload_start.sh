#!/bin/bash

apache2-foreground &
/ftp_run.sh -l puredb:/etc/pure-ftpd/pureftpd.pdb -E -j -R -P $PUBLICHOST
