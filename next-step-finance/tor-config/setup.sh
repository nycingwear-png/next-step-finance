#!/bin/bash
sudo apt install tor
sudo mkdir -p /var/lib/tor/nextstep/
sudo chown debian-tor:debian-tor /var/lib/tor/nextstep/
sudo service tor restart
echo "Onion URL: $(cat /var/lib/tor/nextstep/hostname)"