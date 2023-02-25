// const unsigned char active_buzzer = D5;

void playBuzzer(int pin, int times, int interval)
{
    for (int i = 0; i < times; i++)
    {
        /* code */
        digitalWrite(pin, HIGH);
        delay(interval);
        digitalWrite(pin, LOW);
        delay(interval);
        Serial.println("sound completed");
    }
}