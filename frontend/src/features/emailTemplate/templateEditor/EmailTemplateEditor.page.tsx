import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { storeTemplateFormData } from './types';
import { storeTemplate } from './TemplateConfig.service';
import toast from 'react-hot-toast';
import { getTemplateInfo, updateTemplate } from './TemplateConfig.service';
import { useAuth } from '../../../context/AuthContext';

// Import React Quill and its standard snow theme stylesheet
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const DYNAMIC_TAGS = ['{{position_name}}', '{{company_name}}', '{{your_name}}', '{{hr_name}}'];

const EmailTemplateEditor: React.FC = () => {
  const { refreshRedirection } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  
  // React Quill ref to handle programmatically inserting dynamic tags at cursor position
  const quillRef = useRef<ReactQuill>(null);
  
  const [formData, setFormData] = useState<storeTemplateFormData>({
    name: '',
    subject: '',
    body: ''
  });

  // Inserts dynamic tags at the cursor position
  const insertTag = (tag: string, field: 'subject' | 'body') => {
    if (field === 'subject') {
      setFormData(prev => ({
        ...prev,
        subject: prev.subject + ' ' + tag
      }));
    } else {
      // Body (Rich Text) Tag Insertion at Cursor
      const editor = quillRef.current?.getEditor();
      if (editor) {
        const range = editor.getSelection();
        const position = range ? range.index : editor.getLength();
        editor.insertText(position, ` ${tag} `);
        // Update local state with the newly modified HTML content
        setFormData(prev => ({
          ...prev,
          body: editor.root.innerHTML
        }));
      } else {
        // Fallback if editor is not yet mounted
        setFormData(prev => ({
          ...prev,
          body: prev.body + ' ' + tag
        }));
      }
    }
  };

  const handleFormSubmit = async() => {
    console.log("final input to form submit:", formData);

    const data = {
      templateid: parseInt(id ? id : ''),
      template_name: formData.name,
      template_subject: formData.subject,
      template_body: formData.body // This now safely contains formatted HTML (e.g., <p><strong>Hello</strong></p>)
    }
    
    try {
      if(!id){
        const response = await storeTemplate(formData);
        console.log("Store template result:", response);
        toast.success(response?.message || "Template stored successfully.");
        await refreshRedirection();
        navigate('/templates');
      };

      if(id){
        const response = await updateTemplate(data);
        console.log("update template", response);
        toast.success(response?.message || "Template updated successfully.");
        await refreshRedirection();
        navigate('/templates');
      }
    } catch (error) { console.error("Template save failed", error); }
  };

  useEffect(() => {
    let data = {
      templateid: 0
    };

    if(id){
      data.templateid = parseInt(id)
    };

    const fetchTemplateInfo = async () => {
      try {
        const response = await getTemplateInfo(data);
        setFormData({
          name: response?.data[0].template_name,
          subject: response?.data[0].subject_title,
          body: response?.data[0].body || ''
        });
      } catch (error) { console.error(error); }
    };

    if(id){
      fetchTemplateInfo();
    };
  }, [id]);

  // Configure custom formatting options for the toolbar
  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // text toggles
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // list points
      ['clean']                                         // remove formatting button
    ],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-sm mt-8">
      <h2 className="text-xl font-bold mb-6">{id ? 'Edit Template' : 'Create New Template'}</h2>
      
      <div className="space-y-4">
        {/* Template Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
          <input 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="e.g. Outreach Email - Tech"
          />
        </div>

        {/* Subject Line */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {DYNAMIC_TAGS.map(tag => (
              <button key={tag} onClick={() => insertTag(tag, 'subject')} className="text-[10px] bg-gray-100 px-2 py-1 rounded border hover:bg-gray-200">
                + {tag}
              </button>
            ))}
          </div>
          <input 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          />
        </div>

        {/* Rich Text Email Body */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Body</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {DYNAMIC_TAGS.map(tag => (
              <button key={tag} onClick={() => insertTag(tag, 'body')} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 hover:bg-blue-100">
                + {tag}
              </button>
            ))}
          </div>
          
          {/* Replace native textarea with ReactQuill */}
          <div className="quill-editor-wrapper">
            <ReactQuill 
              ref={quillRef}
              theme="snow"
              modules={quillModules}
              value={formData.body}
              onChange={(content) => setFormData({...formData, body: content})}
              placeholder="Write your email body here..."
              className="rounded-md"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => navigate('/templates')} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => handleFormSubmit()}
          >
            Save Template
          </button>
        </div>
      </div>

      {/* Minor style override to make the rich editor look cohesive with your UI */}
      <style>{`
        .quill-editor-wrapper .ql-toolbar {
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          border-color: #d1d5db;
        }
        .quill-editor-wrapper .ql-container {
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          border-color: #d1d5db;
          min-height: 250px;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
};

export default EmailTemplateEditor;