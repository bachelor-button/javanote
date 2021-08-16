from genericpath import isdir
import os

path = r"E:\files\1-study\笔记\cloud-note\coding\Java\vuepress\docs\note\project"


def list(path):
    dir_list = os.listdir(path)
    for dir in dir_list:
        if(os.path.isdir(os.path.join(path, dir))):
            list(os.path.join(path, dir))
        elif dir.endswith("md"):
            print(os.path.join(path, dir))


list(path)
