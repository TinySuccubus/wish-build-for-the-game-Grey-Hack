if active_user != "root" then exit("run as root.")

shell = get_shell
computer = shell.host_computer
counter = 0
maxSize = 1/0

wishFolder = computer.File(current_path + "/wishFolder")
if not wishFolder then computer.create_folder(current_path, "wishFolder")
wishFolderPath = computer.File(current_path + "/wishFolder").path
chkpnt=computer.File(current_path+"/wishFolder.chkpnt")
if not chkpnt then 
    computer.touch(current_path,"wishFolder.chkpnt")
    chkpnt=computer.File(current_path+"/wishFolder.chkpnt")
    chkpnt.set_content("0LINE"+str(1/0))
else
    counter=chkpnt.get_content.split("LINE")[0].val
    maxSize=chkpnt.get_content.split("LINE")[1].val
end if

letters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
lettersLen = letters.len
dt=time
while true
    gen_name = function(number)
        k = []
        base_convert=function(num)
            if num<lettersLen then return k.push(letters[num%lettersLen])
            base_convert(floor(num/lettersLen))
            k.push(letters[num%lettersLen])
        end function
        base_convert(number)
        return k.join("")
    end function

    currentName = gen_name(counter)
    if counter % 100 == 0 then                                      //cleanup folder?And save progress!
        wishFolder = computer.File(current_path + "/wishFolder")
        saveName=gen_name(counter-1)
        saveFile=computer.File(wishFolder.path+"/"+saveName)
        if saveFile then 
            print("<b>Saving...</b>  Stats{ (current_name: <b>" + saveName + "</b> size: "+saveFile.size+")  known min_size: " + maxSize+"  dt: "+(time-dt)+"s }")
            dt=time
        end if
        if wishFolder then wishFolder.delete
        computer.create_folder(current_path, "wishFolder")
        computer.touch(wishFolder.path, "_.src")
        sourceFile = computer.File(wishFolderPath + "/" + "_.src")
        sourceFile.set_content(" ")
        chkpnt.set_content(str(counter)+"LINE"+str(maxSize))
    end if
    sourceFile.rename(currentName + ".src")
    sourceFile = computer.File(wishFolderPath + "/" + currentName + ".src")
    shell.build(sourceFile.path, wishFolder.path)
    binaryFile = computer.File(wishFolder.path + "/" + currentName)
    if binaryFile then                                                                      //Weird bug in online mode may fail .size
        if val(binaryFile.size) <= maxSize then
            maxSize = val(binaryFile.size)
            print("Smaller size found! name: <b>" + currentName + "</b> size: " + maxSize)
            if maxSize==110000 then
                min_list=computer.File(current_path+"/minList.txt")
                if not min_list then 
                    computer.touch(current_path,"minList.txt")
                    min_list=computer.File(current_path+"/minList.txt")
                end if
                min_list.set_content(min_list.get_content+currentName+char(10))
            end if
        end if
    else
        exit(binaryFile+typeof(binaryFile))
    end if
    counter = counter + 1
end while
