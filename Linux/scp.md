[How to Securely Transfer Files Between Servers with scp](https://www.linux.com/learn/intro-to-linux/2017/2/how-securely-transfer-files-between-servers-scp)

> If you run a live or home server, moving files between local machines or two remote machines is a basic requirement. There are many ways to achieve that. In this article, we talk about scp (secure copy command) that encrypts the transferred file and password so no one can snoop. With scp you don’t have to start an FTP session or log into the system.

> The scp tool relies on SSH (Secure Shell) to transfer files, so all you need is the username and password for the source and target systems. Another advantage is that with SCP you can move files between two remote servers, from your local machine in addition to transferring data between local and remote machines. In that case you need usernames and passwords for both servers. Unlike Rsync, you don’t have to log into any of the servers to transfer data from one machine to another.

## Copy a single file from the local machine to a remote machine:
The scp command needs a source and destination to copy files from one location to another location. This is the pattern that we use:
```
scp localmachine/path_to_the_file username@server_ip:/path_to_remote_directory

```
In the following example I am copying a local file from my macOS system to my Linux server (Mac OS, being a UNIX operating system has native support for all UNIX/Linux tools).
```
scp /home/swapnil/Downloads/fedora.iso swapnil@10.0.0.75:/media/prim_5/media_server/
```

Mac OS
```
➜  ~ ls
Applications             Desktop                  Downloads                Music                    Repo                     iCloud Drive（归档）
DB                       Document                 Library                  Pictures                 Work                     test.txt
Demo                     Documents                Movies                   Public                   dump.rdb
➜  ~ scp test.txt root@10.101.111.190:/root/
root@10.101.111.190's password:
test.txt                                                                                                                                         100%    0     0.0KB/s   00:00
```

If you are running Windows 10, then you can use Ubuntu bash on Windows to copy files from the Windows system to Linux server:
```
scp /mnt/c/Users/swapnil/Downloads/fedora.iso swapnil@10.0.0.75:/media/prim_5/
  media_server/
```

## Copy a local directory to a remote server:

If you want to copy the entire local directory to the server, then you can add the -r flag to the command:
```
scp -r localmachine/path_to_the_directory username@server_ip:/path_to_remote_directory/
```

Mac OS
```
➜  ~ ls Repo
AwesomeProject          Express-api             React-news-front        dva                     gs-rest-service         my-app
Download                MERN-Stack              Server                  front-end               iicoom.github.io        react-music-player
Eslint                  Note                    antPro                  gs-accessing-data-mysql msg_client              redux-saga
➜  ~ scp -r Repo root@10.101.111.190:/root/
root@10.101.111.190's password:
.DS_Store                                                                                                                                        100%   16KB   1.2MB/s   00:00
.DS_Store                                                                                                                                        100% 8196     2.2MB/s   00:00
.editorconfig                                                                                                                                    100%  245   148.9KB/s   00:00
.eslintrc                                                                                                                                        100% 1903   857.2KB/s   00:00
.ga                                                                                                                                              100%   32    12.7KB/s   00:00
COMMIT_EDITMSG                                                                                                                                   100%    9     2.3KB/s   00:00
config                                                                                                                                           100%  347    89.8KB/s   00:00
description                                                                                                                                      100%   73    23.7KB/s   00:00
FETCH_HEAD                                                                                                                                       100%   87    21.1KB/s   00:00
```
190查看
```
➜  ~ ssh root@10.101.111.190
root@10.101.111.190's password:
Last login: Fri Apr 20 14:26:10 2018 from 10.102.104.224
[root@cache ~]# ls
163.nginx  aios-release  anaconda-ks.cfg  test.txt  thtf
[root@cache ~]# ls
163.nginx  aios-release  anaconda-ks.cfg  Repo  test.txt  thtf
```

**Make sure that the source directory doesn’t have a forward slash at the end of the path, at the same time the destination path *must* have a forward slash.**

## Copying files from remote server to local machine
If you want to make a copy of a single file, a directory or all files on the server to the local machine, just follow the same example above, just exchange the place of source and destination.

Copy a single file:
```
scp username@server_ip:/path_to_remote_directory local_machine/path_to_the_file 
```

## Copy files from one remote server to another remote server from a local machine
rsync 命令只能先登录到一台远程Linux，然后传文件到另一台Linux
SCP 命令则不需要登录到任何Linux，就可以完成2台 Linux之间的文件传输

Currently I have to ssh into one server in order to use rsync command to copy files to another server. I can use SCP command to move files between two remote servers:

Usually I ssh into that machine and then use rsync command to perform the job, but with SCP, I can do it easily without having to log into the remote server.

Copy a single file:
```
scp username@server1_ip:/path_to_the_remote_file username@server2_ip:/
  path_to_destination_directory/
```

Copy a directory from one location on a remote server to different location on the same server:
```
scp username@server1_ip:/path_to_the_remote_file username@server2_ip:/
  path_to_destination_directory/
```

Copy all files in a remote directory to a local directory
```
scp -r username@server1_ip:/path_to_source_directory/* username@server2_ip:/
  path_to_the_destination_directory/ 
```


Conclusion
As you can see, once you understand how things work, it will be quite easy to move your files around. That’s what Linux is all about, just invest your time in understanding some basics, then it’s a breeze!




