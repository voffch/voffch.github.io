---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Pumping up your Git Bash"
pubDate: 2024-11-17
description: "How to add apps (rsync, iperf3, whois) to git bash on Windows"
tags: ["admin", "linux", "windows"]
---

This is another "note to self", because there are literally hundreds of similar instructions at the top of google search results. Obviously. Where did you think I got all I know? The sites I used are all referenced below.

Anyway, suppose you are using Windows with Git Bash already installed and you want to get your hands on a handy little app from the linux world quickly and without installing full-fledged environments like <abbr title="Windows Subsystems for Linux">WSL</abbr>. Turns out Git Bash is *kinda* based on [MSYS2](https://www.msys2.org/) with a limited number of preinstalled essential tools. We're going to get additional precompiled tools from the [MSYS2 repo](https://repo.msys2.org/msys/x86_64/) and drop them into the Git Bash folder. As an example, I'm installing `rsync`, `iperf3` and `whois`. I'm using Git Bash that came with `git` version 2.44.0.windows.1.

1. Go to [https://repo.msys2.org/msys/x86_64/](https://repo.msys2.org/msys/x86_64/) and grab the compressed (`*.zst`) packages:
    - `whois-5.5.23-1-x86_64.pkg.tar.zst`
    - `iperf3-3.17.1-1-x86_64.pkg.tar.zst`
    - `rsync-3.3.0-1-x86_64.pkg.tar.zst`
    - `libxxhash-0.8.2-1-x86_64.pkg.tar.zst`

Your package versions may differ from mine; I just downloaded the most recent ones. The first three are obvious, the last is a `rsync` dependency. Different websites list different dependencies that you have to install for `rsync`. For instance, [this guy](https://dzen.ru/a/ZaWirJb3HAKqawp3) and [these people](https://scicomp.aalto.fi/scicomp/rsynconwindows/) suggest installing more packages, like `libopenssl`; however, I found them already installed in Git Bash.

2. Open the archives one by one (both 7zip and the built-in unarchiver in Windows 11 worked for me) and drop the `usr` folders directly into the `C:\Program Files\Git`. The destination already contains the `usr` folder, so this action just adds the new content to the existing `usr`'s subfolders (e.g., `usr\bin`).

3. Open the Git Bash terminal, `mintty`, and try using the apps.

For instance, the following command will download the `/home/user` folder from `remote` server to the current working directory.

```bash
rsync -avz --stats user@remote:/home/user .
```

`iperf3` can be used for testing the network connection speed. This command tests the bidirectional connection with `server` that is listening at the `port`:

```bash
iperf3 -c server -p port -bidir
```

For this to work, you have to either turn on the server somewhere (e.g., with `iperf3 -s -p port` - don't forget to specify the port) or choose one of the [public servers](https://iperf.fr/iperf-servers.php).

`whois` can be used to query the info regarding an IP address or a domain name. However, it was news to me that ICANN is actively retiring the [WHOIS protocol](https://en.wikipedia.org/wiki/WHOIS) in favor of a shiny new thing called [RDAP](https://www.icann.org/rdap). Who knows? Maybe some time soon we'll have to get rid of `whois` as it will be totally obsolete. Even now you can get RDAP/WHOIS data, that is, "WHOIS only if RDAP is not available", via the web tools like this official [ICANN](https://lookup.icann.org/en/lookup) page. 