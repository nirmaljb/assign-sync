"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Play, Save } from "lucide-react";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { toast } from "sonner";

const initialCode = `function factorial(n) {
  // Your code here
}`;

export default function AssignmentDetailPage() {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");

  const handleRunCode = () => {
    try {
      // Create a new function from the code
      const fn = new Function(`
        ${code}
        return factorial;
      `)();

      // Test cases
      const testCases = [
        { input: 0, expected: 1 },
        { input: 5, expected: 120 },
      ];

      const results: string[] = [];
      let allPassed = true;

      testCases.forEach(({ input, expected }) => {
        try {
          const result = fn(input);
          const passed = result === expected;
          allPassed = allPassed && passed;
          results.push(`Test factorial(${input}): ${passed ? "✓" : "✗"} Expected ${expected}, got ${result}`);
        } catch (error) {
          const typedError = error as { message: string; key: { [key: string]: string } };
          allPassed = false;
          results.push(`Test factorial(${input}): ✗ Error: ${typedError.message}`);
        }
      });

      setOutput(results.join("\n"));

      if (allPassed) {
        toast.success("All tests passed!");
      } else {
        toast.error("Some tests failed. Check the output.");
      }
    } catch (error) {
      const typedError = error as { message: string; key: { [key: string]: string } };
      setOutput(`Error: ${typedError.message}`);
      toast.error("Error running code");
    }
  };

  const handleSaveCode = () => {
    // Here you would typically save to a backend
    toast.success("Code saved successfully!");
  };

  return (
    <div className="h-[calc(100vh-4rem)] p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">JavaScript Basics</h2>
            <div className="space-x-2">
              <Button size="sm" variant="outline" onClick={handleSaveCode}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button size="sm" onClick={handleRunCode}>
                <Play className="h-4 w-4 mr-2" />
                Run
              </Button>
            </div>
          </div>
          <Card className="h-[calc(100%-5rem)]">
            <Tabs defaultValue="instructions">
              <TabsList>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="tests">Tests</TabsTrigger>
                <TabsTrigger value="output">Output</TabsTrigger>
              </TabsList>
              <TabsContent value="instructions" className="p-4">
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Task Description</h3>
                    <p>Create a function that calculates the factorial of a number.</p>
                    <div className="space-y-2">
                      <h4 className="font-medium">Requirements:</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Function should be named `factorial`</li>
                        <li>Should accept one parameter `n`</li>
                        <li>Should return the factorial of n</li>
                        <li>Handle edge cases (n = 0, n = 1)</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Examples:</h4>
                      <pre className="bg-secondary p-2 rounded-md">
                        {`factorial(0) // returns 1
factorial(1) // returns 1
factorial(5) // returns 120`}
                      </pre>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="tests" className="p-4">
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  <pre className="text-sm">
                    {`test('factorial of 0 is 1', () => {
  expect(factorial(0)).toBe(1);
});

test('factorial of 5 is 120', () => {
  expect(factorial(5)).toBe(120);
});`}
                  </pre>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="output" className="p-4">
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {output || "Run your code to see output"}
                  </pre>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div className="space-y-4 h-full">
          <Card className="h-[70%] overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </Card>
          <Card className="h-[calc(30%-1rem)]">
            <div className="p-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Chat</h3>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <div className="space-y-4">
                  <div className="text-sm">
                    <span className="font-medium">Teacher:</span> Let me know if you need
                    help!
                  </div>
                </div>
              </ScrollArea>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
