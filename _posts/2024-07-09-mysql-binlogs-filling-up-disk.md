---
layout: post
title:  "What to do when mysql's .binlog files are filling up the disk"
date:   2022-05-28 10:00:00 +0700
categories: [mysql]
---

Woke up to alerts that websites were down. Quickly find that the disk is full with `df -h`. Next up why. Install ncdu with `apt-get install ncdu` and view a tree of my directories and their sizes.


```shell
--- / --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    9.1 GiB [##########] /var
    6.2 GiB [######    ] /usr
    2.6 GiB [##        ] /home
    2.2 GiB [##        ] /snap
  387.1 MiB [          ] /boot
  150.8 MiB [          ] /root
   36.1 MiB [          ] /etc
```

Dig around in there until I find the binlogs. Okay how to remove them, quick google turns up this to make them automatically expire

```sql
SET PERSIST binlog_expire_logs_seconds = 259200;
SET GLOBAL binlog_expire_logs_seconds = 259200;
SHOW BINARY LOGS;
```
```
+---------------+-----------+-----------+
| Log_name      | File_size | Encrypted |
+---------------+-----------+-----------+
| binlog.001604 | 104861415 | No        |
| binlog.001605 |   2133604 | No        |
| binlog.001606 |  10123192 | No        |
| binlog.001607 |       157 | No        |
| binlog.001608 |       157 | No        |
| binlog.001609 |  54486285 | No        |
| binlog.001610 |    181294 | No        |
| binlog.001611 |    301159 | No        |
| binlog.001612 |    120357 | No        |
| binlog.001613 |       157 | No        |
| binlog.001614 |  20589546 | No        |
| binlog.001615 |  72575731 | No        |
| binlog.001616 |  41724083 | No        |
| binlog.001617 |       157 | No        |
...
```
Oh that didn't clean the old ones. Finally cleared with

```sql
PURGE BINARY LOGS TO 'binlog.last_number_i_saw';
```

Restart a few things and we're rolling again.