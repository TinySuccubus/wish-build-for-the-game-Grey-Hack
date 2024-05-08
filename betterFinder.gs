if active_user != "root" then exit("run as root.")

shell = get_shell
computer = shell.host_computer
counter = 0
maxSize = 110000

wishFolder = computer.File(current_path + "/wishFolder")
if not wishFolder then computer.create_folder(current_path, "wishFolder")
wishFolderPath = computer.File(current_path + "/wishFolder").path
chkpnt=computer.File(current_path+"/wishFolder.chkpnt")
// if not chkpnt then 
//     computer.touch(current_path,"wishFolder.chkpnt")
//     chkpnt=computer.File(current_path+"/wishFolder.chkpnt")
//     chkpnt.set_content("0LINE"+str(1/0))
// else
//     counter=chkpnt.get_content.split("LINE")[0].val
//     maxSize=chkpnt.get_content.split("LINE")[1].val
// end if
computer.touch(wishFolderPath,"_.src")
sourceFile = computer.File(wishFolderPath + "/" + "_.src")
sourceFile.set_content(" ")
letters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
lettersLen = letters.len
dt=time
i=0
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
    save=function(num)
        wishFolder = computer.File(current_path + "/wishFolder")
        saveName=gen_name(num)
        saveFile=computer.File(wishFolder.path+"/"+saveName)
        if saveFile then 
            print("<b>Saving...</b>  Stats{ (current_name: <b>" + saveName + "</b> size: "+saveFile.size+")  known min_size: " + maxSize+"  dt: "+(time-dt)+"s }")
            dt=time
        end if
        if wishFolder then wishFolder.delete
        computer.create_folder(current_path, "wishFolder")
        min_list=computer.File(current_path+"/minList.txt")
        if not min_list then 
            computer.touch(current_path,"minList.txt")
            min_list=computer.File(current_path+"/minList.txt")
        end if
        min_list.set_content(min_list.get_content+saveName+char(10))
        chkpnt.set_content(str(num)+"LINE"+str(maxSize))
    end function
    test=function(Name)
        computer.touch(wishFolderPath,Name+".src")
        srcFile=computer.File(wishFolderPath+"/"+Name+".src")
        srcFile.set_content(" ")
        shell.build(srcFile.path,wishFolderPath)
        binFile=computer.File(wishFolderPath+"/"+Name)
        if val(binFile.size)<=110000 then
            return true
        end if
        return false
    end function
    clean=function()
        wishFolder = computer.File(current_path + "/wishFolder")
        if wishFolder then wishFolder.delete
        computer.create_folder(current_path, "wishFolder")
    end function

    if i>50 then 
        clean()
        i=0
    end if
    rndNumber=floor(rnd*14776335)
    // rndNumber=4426595
    if test(gen_name(rndNumber)) then
        save(rndNumber)
        counter=rndNumber
        while true
            if test(gen_name(counter+108)) then
                save(counter+108)
                counter=counter+108
                continue
            end if
            if test(gen_name(counter+245)) then
                save(counter+245)
                counter=counter+245
                continue
            end if
            if test(gen_name(counter+860)) then
                save(counter+860)
                counter=counter+860
                continue
            end if
            if test(gen_name(counter+1134)) then
                save(counter+1134)
                counter=counter+1134
                continue
            end if
            if test(gen_name(counter+1636)) then
                save(counter+1636)
                counter=counter+1636
                continue
            end if
            if test(gen_name(counter+2496)) then
                save(counter+2496)
                counter=counter+2496
                continue
            end if
            print "oops"
            break
        end while
    end if
    i=i+1
    //counter+108?continue:(counter+245?continue:(counter+860?continue:(counter+1134?continue:(counter+1636?continue:(counter+2496?continue:do random)))))
end while
