folder="JavaScript Result"
name="new"
extension=".txt"
if [ -e "$folder$name $i$extension" ] ; then
i=2
while [ -e "$folder$name $i$extension" ] ;do
let i++
done
name="$name $i"
fi
touch "$folder$name$extension"