# Use wave package (native to Python) for reading the received audio file
import wave
import sys
morphed_audio = wave.open(sys.argv[1], mode='rb')
# Convert audio to byte array
frame_bytes = bytearray(
    list(morphed_audio.readframes(morphed_audio.getnframes())))

# Extract  LSB
decrypted_text = [frame_bytes[i] & 1 for i in range(len(frame_bytes))]
#  byte array  to string
string = "".join(chr(
    int("".join(map(str, decrypted_text[i:i+8])), 2)) for i in range(0, len(decrypted_text), 8))
# remove filler characters
decoded = string.split("###")[0]

# output the decrypted_text
print("<h3>"+"Sucessfully decoded: "+decoded + "</h3>")
morphed_audio.close()
