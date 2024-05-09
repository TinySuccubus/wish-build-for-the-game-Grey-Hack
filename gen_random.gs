//gen_random < 4<lenth<128 >

shell = get_shell
computer = shell.host_computer

letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz"
lettersLen = letters.len
code_list=letters.values
for i in range(lettersLen-1)
    code_list[i]=code(code_list[i])
end for

    test=function(Name)
        seed = 0
        for letter in Name
            seed = seed + code(letter) * i 
        end for
        return seed%1000==0
    end function

name_len=4+rnd*(128-4)                      //No 110k size when lenth under 4 with {0-9,a-z,A-Z}
if params.len!=0 then 
    if params[0].val<4 then exit("lenth can't less than 4")
    name_len=params[0].val
end if
v=0
n=[]
while v<1000                                //Generate a name with value above 1000
    v=0
    n=[]
    for i in range(name_len,1)
        n.push(letters[floor(rnd*(lettersLen-1))])
        v=v+i*code(n[name_len-i])
    end for
end while
n.reverse
dv=v%1000
for digit in range(n.len,1)
    letter_pos=letters.indexOf(n[digit-1])
    _count=0
    c=0
    if letter_pos>0 then
        for i in range(0,letter_pos-1)
            c=digit*code(letters[i])
            if c<=dv then 
                _count=_count+1
            else
                break
            end if
        end for
    end if
    n[digit-1]=letters[letter_pos-_count]
    if c==dv then break
    dv=dv-c
end for
print n.join("")+"\nis 110k:"+test(n.join(""))
